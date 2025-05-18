import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { ScrollView } from "react-native-gesture-handler";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";
import Header from "@/src/components/Header/Header";
import { Endereco } from "@/src/model/Endereco";

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
      const user = await viewer.criarConta(email, senha, nome, telefone, "CLIENTE", cpf);
      if (!user) {
        alert("Erro ao criar conta. Tente novamente.");
        return;
      }

      const endereco = new Endereco("rua", "bairro", "numero", "complemento", "cidade", "23934005");
      user.adicionarEndereco(endereco);
      console.log(endereco)
      console.log(user)
      const a = await viewer.vincularEndereco(endereco);
      console.log("Endereço vinculado:", a);

      alert("Usuário cadastrado com sucesso!");
      navigation.navigate("Main", { screen: "Home" });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário: " + error);
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
        <Input label={"Nome"} placeholder={"Digite seu nome"} value={nome} onChangeText={setNome} isSignUp />
        <Input label={"CPF"} placeholder={"Digite seu CPF"} value={cpf} onChangeText={setCpf} isSignUp />
        <Input label={"E-mail"} placeholder={"Digite seu e-mail"} value={email} onChangeText={setEmail} isSignUp />
        <Input
          label={"Telefone"}
          placeholder={"Digite seu telefone"}
          value={telefone}
          onChangeText={setTelefone}
          isSignUp
        />
        <Input
          label={"Senha"}
          placeholder={"Digite sua senha"}
          value={senha}
          onChangeText={setSenha}
          password
          isSignUp
        />
        <View style={{ marginTop: 20 }}>
          <Button title="Confirmar" onPress={handleSignUp} />
        </View>
        {/* <Text style={styles.text}>Rua: </Text>
        <TextInput
          placeholder="Digite sua rua"
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
