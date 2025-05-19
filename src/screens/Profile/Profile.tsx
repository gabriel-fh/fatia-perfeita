import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { auth } from "@/src/setup/FirebaseSetup";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";
import Usuario from "@/src/model/Usuario";
import NotAuth from "@/src/components/NoAuth/NotAuth";
import Header from "@/src/components/Header/Header";
import UserInfo from "./components/UserInfo";
import Options from "./components/Options";
import { useAddress } from "@/src/contexts/Address";

const viewer = new ViewerUsuario();

const Profile = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const { saveAddressToStorage } = useAddress();

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser && auth.currentUser.uid) {
        const user = await viewer.carregarUsuario(auth.currentUser.uid);

        if (!user) {
          setLoading(false);
          return;
        }

        const address = await viewer.obterUmEnderecoDoUsuario(auth.currentUser.uid);

        if (address) {
          await saveAddressToStorage(address);
        }
        setUsuario(user);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUser();
      } else {
        setUsuario(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [saveAddressToStorage]);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.navigate("Main", { screen: "Home" });
    setUsuario(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title="Meu Perfil" />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !usuario ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <NotAuth />
        </View>
      ) : (
        <>
          <UserInfo user={usuario} />
          <Options handleLogout={handleLogout} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    padding: 16,
  },
});

export default Profile;
