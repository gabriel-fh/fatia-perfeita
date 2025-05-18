import { Text, StyleSheet, Alert, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/src/components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { colors } from "@/src/utils/styles";
import Header from "@/src/components/Header/Header";
import Input from "@/src/components/Input/Input";
import { Endereco } from "@/src/model/Endereco";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AddressType = {
  rua: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  cep: string;
};

const Address = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const [address, setAddress] = React.useState<AddressType>({
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    cep: "",
  });

  const inputs = [
    { label: "Rua", value: address.rua, onChange: (text: string) => setAddress({ ...address, rua: text }) },
    { label: "Número", value: address.numero, onChange: (text: string) => setAddress({ ...address, numero: text }) },
    { label: "Bairro", value: address.bairro, onChange: (text: string) => setAddress({ ...address, bairro: text }) },
    {
      label: "Complemento",
      value: address.complemento,
      onChange: (text: string) => setAddress({ ...address, complemento: text }),
    },
    { label: "Cidade", value: address.cidade, onChange: (text: string) => setAddress({ ...address, cidade: text }) },
    { label: "CEP", value: address.cep, onChange: (text: string) => setAddress({ ...address, cep: text }) },
  ];

  const saveAddressToStorage = async (address: Endereco) => {
    try {
      const jsonValue = JSON.stringify(address);
      await AsyncStorage.setItem("address", jsonValue);
    } catch (error) {
      console.error("Error saving address to storage:", error);
      throw error;
    }
  };

  const onSaveAddress = async () => {
    try {
      const endereco = new Endereco(
        address.rua,
        address.numero,
        address.bairro,
        address.complemento,
        address.cidade,
        address.cep
      );

      await saveAddressToStorage(endereco);
      navigation.navigate("Main", { screen: "Home" });
    } catch (error: any) {
      console.error("Error saving address:", error);
      Alert.alert("Erro ao salvar o endereço.", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <Header title={"Endereço"} />
      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.title}>Insira seu endereço</Text>
        <Text style={styles.text}>Por favor, preencha os campos abaixo para que possamos entregar sua pizza.</Text>
        {inputs.map((input, index) => (
          <Input
            key={index}
            label={input.label}
            value={input.value}
            onChangeText={input.onChange}
            placeholder={`Digite seu ${input.label.toLowerCase()}`}
            required
          />
        ))}
        <Button title="Salvar" onPress={onSaveAddress} style={{ marginTop: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    paddingTop: 32,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_500Medium",
    color: "#fff",
  },
  text: {
    fontSize: 15,
    fontFamily: "SpaceGrotesk_400Regular",
    marginTop: 8,
    color: "#c9c9c9",
    marginBottom: 16,
  },
});

export default Address;
