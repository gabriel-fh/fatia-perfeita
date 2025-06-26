import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";
import Header from "@/src/components/Header/Header";
import { useAddress } from "@/src/contexts/Address";
import CtrlManterUsuarios from "@/src/controller/CtrlManterUsuarios";

const ctrl = new CtrlManterUsuarios();

const SignUp = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const { address, setAddress, saveAddressToStorage } = useAddress();

  const handleSignUp = async () => {
    try {
      
      if (!address) {
        alert("Erro ao criar conta. Endereço não encontrado.");
        navigation.navigate("Address", { add: false });
        return;
      }

      const user = await ctrl.criarConta(email, senha, nome, telefone, "CLIENTE", cpf);
      
      if (!user) {
        alert("Erro ao criar conta. Tente novamente.");
        return;
      }

      user.adicionarEndereco(address);
      const enderecoDB = await ctrl.vincularEndereco(address);

      if (enderecoDB) {
        setAddress(enderecoDB);
        await saveAddressToStorage(enderecoDB);
      }

      alert("Usuário cadastrado com sucesso!");
      navigation.navigate("Main", { screen: "Home" });
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.message);
      alert("Erro ao cadastrar usuário: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title={"Criar conta"} />
      <Text
        style={{
          color: "#e6e6e6",
          fontFamily: "SpaceGrotesk_500Medium",
          fontSize: 15,
          marginVertical: 20,
        }}
      >
        Insira suas informações nos campos abaixo:
      </Text>
      <ScrollView>
        <Input label={"Nome"} placeholder={"Digite seu nome"} value={nome} onChangeText={setNome} required />
        <Input label={"CPF"} placeholder={"Digite seu CPF"} value={cpf} onChangeText={setCpf} required />
        <Input label={"E-mail"} placeholder={"Digite seu e-mail"} value={email} onChangeText={setEmail} required />
        <Input
          label={"Telefone"}
          placeholder={"Digite seu telefone"}
          value={telefone}
          onChangeText={setTelefone}
          required
        />
        <Input
          label={"Senha"}
          placeholder={"Digite sua senha"}
          value={senha}
          onChangeText={setSenha}
          password
          required
        />
        <Button
          title="Confirmar"
          onPress={handleSignUp}
          style={{
            marginTop: 20,
          }}
        />
      </ScrollView>
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
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.bgSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    color: "#fff",
  },
});

export default SignUp;
