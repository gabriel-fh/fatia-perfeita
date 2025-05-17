import { Text, StyleSheet, Button, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { auth } from "@/src/setup/FirebaseSetup";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";
import Usuario from "@/src/model/Usuario";

const viewer = new ViewerUsuario();

const Profile = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const [usuario, setUsuario] = useState<Usuario | null>();

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser && auth.currentUser.uid) {
        const user = await viewer.carregarUsuario(auth.currentUser.uid);
        setUsuario(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      {!usuario ? (
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      ) : (
        <View>
          <Text style={styles.text}>Nome: {usuario?.getNome()}</Text>
          <Text style={styles.text}>Email: {usuario?.getEmail()}</Text>
          <Text style={styles.text}>Telefone: {usuario?.getTelefone()}</Text>
          <Button
            title="Sair"
            onPress={() => {
              auth.signOut().then(() => {
                setUsuario(null);
                navigation.navigate("Main", { screen: "Home" });
              });
            }}
          />
        </View>
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
  text: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 12,
  },
});

export default Profile;
