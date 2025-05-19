import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/src/utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/Header/Header";
import AddressCard from "./components/AddressCard";
import ViewerEndereco from "@/src/viewer/ViewerEndereco";
import { auth } from "@/src/setup/FirebaseSetup";
import { Endereco } from "@/src/model/Endereco";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";

const viewer = new ViewerEndereco();

const MyAddresses = () => {
  const [addresses, setAddresses] = useState<Endereco[] | []>([]);
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadEnderecos = async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const data = await viewer.carregarEnderecos(uid);
        setAddresses(data);
      }
    };

    loadEnderecos();
  }, [addresses]);

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title="Meus Endereços" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {addresses.map((address) => (
          <AddressCard key={address.getId()} address={address} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("Address", { add: true })}>
        <Text style={styles.link}>Adicionar Endereco</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    padding: 16,
  },
  link: {
    color: colors.primary,
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default MyAddresses;
