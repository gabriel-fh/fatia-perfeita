import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { auth } from "@/src/setup/FirebaseSetup";
import Usuario from "@/src/model/Usuario";
import NotAuth from "@/src/components/NoAuth/NotAuth";
import Header from "@/src/components/Header/Header";
import UserInfo from "./components/UserInfo";
import Options from "./components/Options";
import { useAddress } from "@/src/contexts/Address";
import { Endereco } from "@/src/model/Endereco";
import CtrlManterUsuarios from "@/src/controller/CtrlManterUsuarios";

const ctrl = new CtrlManterUsuarios();

const Profile = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const { address, setAddress, saveAddressToStorage } = useAddress();

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser && auth.currentUser.uid) {
        const user = await ctrl.carregarUsuario(auth.currentUser.uid);
        if (!user) {
          setLoading(false);
          return;
        }
        setUsuario(user);
        const address = await ctrl.obterUmEnderecoDoUsuario(auth.currentUser.uid);
        if (address) {
          setAddress(address);
          await saveAddressToStorage(address);
        }
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try{
          await fetchUser();
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        setUsuario(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (address) {
      const newAddress = new Endereco(
        address.getRua(),
        address.getNumero(),
        address.getBairro(),
        address.getComplemento(),
        address.getCidade(),
        address.getCep()
      );
      setAddress(newAddress);
      await saveAddressToStorage(newAddress);
    }
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
