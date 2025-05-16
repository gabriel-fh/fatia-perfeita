import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import CtrlSessao from './../../controller/CtrlSessao';

const ctrlSessao = new CtrlSessao();

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleLogin = async () => {
    try {
      const user = await ctrlSessao.login({ email, senha });
      console.log("Usuário logado:", user);
      alert("Login bem-sucedido!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login: " + error);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <View>
        <Text style={styles.text}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          placeholderTextColor={"#fff"}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={styles.input}
          placeholderTextColor={"#fff"}
          value={senha}
          onChangeText={setSenha}
        />
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
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
});

export default Login;
