import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import CtrlSessao from "./../../controller/CtrlSessao";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Header from "@/src/components/Header/Header";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";

const ctrlSessao = new CtrlSessao();

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const user = await ctrlSessao.login({ email, senha });
      console.log("Usuário logado:", user);
      alert("Login bem-sucedido!");
      navigation.navigate("Main", { screen: "Home" });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login: " + error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title={"Login"} />
      <View style={{ gap: 10 }}>
        <Input label={"E-mail"} placeholder={"Digite seu e-mail"} value={email} onChangeText={setEmail} />
        <Input label={"Senha"} placeholder={"Digite sua senha"} value={senha} onChangeText={setSenha} password />
        <Button title="Entrar" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.bgSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  link: {
    fontSize: 15,
    color: '#fff',
    textAlign: "center",
    fontFamily: "SpaceGrotesk_500Medium",
    textDecorationLine: "underline",
  },
});

export default Login;
