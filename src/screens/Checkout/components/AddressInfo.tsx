import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Endereco } from "@/src/model/Endereco";
import { colors } from "@/src/utils/styles";

const AddressInfo = ({ address }: { address: Endereco }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endereço de Entrega:</Text>
      <Text style={styles.text}>
        {address?.getRua()}, {address?.getNumero()}
      </Text>
      <Text style={styles.text}>
        {address?.getBairro()}, {address?.getCidade()} - {address?.getCep()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgTertiary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    marginBottom: 15,
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
  },
});

export default AddressInfo;
