import { Text, StyleSheet, TextInput, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { ScrollView } from "react-native-gesture-handler";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";
import Usuario from "@/src/model/Usuario";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const viewer = new ViewerUsuario();

const SignUp = () => {
    const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [senha, setSenha] = React.useState("");
  // const [rua, setRua] = React.useState("");
  // const [bairro, setBairro] = React.useState("");
  // const [numero, setNumero] = React.useState("");
  // const [complemento, setComplemento] = React.useState("");
  // const [cidade, setCidade] = React.useState("");
  // const [cep, setCep] = React.useState("");

  const handleSignUp = async () => {
    try {
      const user = await viewer.criarConta(email, senha);
      if (!user) {
        alert("Erro ao criar conta. Tente novamente.");
        return;
      }
      console.log("Usuário criado com UID: ", user.uid);
      await viewer.incluirUsuario(new Usuario(user.uid, nome, email, telefone, "CLIENTE", cpf));
      alert("Usuário cadastrado com sucesso!");
      navigation.navigate("Main", { screen: "Home" });
    } catch (error) {
      alert("Erro ao cadastrar usuário: " + error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <ScrollView>
        <Text style={styles.text}>Nome: </Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setNome}
          value={nome}
        />
        <Text style={styles.text}>CPF: </Text>
        <TextInput
          placeholder="Digite seu CPF"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setCpf}
          value={cpf}
        />
        <Text style={styles.text}>E-mail: </Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setEmail}
          value={email}
        />
        <Text style={styles.text}>Telefone: </Text>
        <TextInput
          placeholder="Digite seu telefone"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setTelefone}
          value={telefone}
        />
        <Text style={styles.text}>Senha: </Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          placeholderTextColor={"#fff"}
          onChangeText={setSenha}
          value={senha}
        />
        {/* <Text style={styles.text}>Rua: </Text>
        <TextInput
          placeholder="Digite sua rua"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setRua}
          value={rua}
        />
        <Text style={styles.text}>Bairro: </Text>
        <TextInput
          placeholder="Digite seu bairro"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setBairro}
          value={bairro}
        />
        <Text style={styles.text}>Número: </Text>
        <TextInput
          placeholder="Digite seu número"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setNumero}
          value={numero}
        />
        <Text style={styles.text}>Complemento: </Text>
        <TextInput
          placeholder="Digite seu complemento"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setComplemento}
          value={complemento}
        />
        <Text style={styles.text}>Cidade: </Text>
        <TextInput
          placeholder="Digite sua cidade"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setCidade}
          value={cidade}
        />
        <Text style={styles.text}>CEP: </Text>
        <TextInput
          placeholder="Digite seu CEP"
          style={styles.input}
          placeholderTextColor={"#fff"}
          onChangeText={setCep}
          value={cep}
        /> */}
        <Button title="Criar conta" onPress={handleSignUp} />
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
