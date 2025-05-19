import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Endereco } from "@/src/model/Endereco";
import { colors } from "@/src/utils/styles";
import { useAddress } from "@/src/contexts/Address";

const AddressCard = ({ address }: { address: Endereco }) => {
  const { address: selectedAddress, setAddress, saveAddressToStorage } = useAddress();

  const setCurrentAddress = async (id: string | undefined) => {
    if (selectedAddress?.getId() === id) {
      return;
    }
    setAddress(address);
    await saveAddressToStorage(address);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setCurrentAddress(address.getId())}>
      <View>
        <Text style={styles.text}>
          Rua: {address.getRua()}, {address.getNumero()}
        </Text>
        <Text style={styles.text}>Bairro: {address.getBairro()},</Text>
        <Text style={styles.text}>Cidade: {address.getCidade()}</Text>
        <Text style={styles.text}>CEP: {address.getCep()}</Text>
      </View>
      <View
        style={[
          styles.marker,
          { borderColor: selectedAddress?.getId() === address.getId() ? colors.primary : colors.bgSecondary },
        ]}
      >
        {selectedAddress?.getId() === address.getId() && <View style={styles.markerDot}></View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgTertiary,
    borderRadius: 8,
    width: "100%",
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
    marginBottom: 10,
    fontSize: 16,
  },
  marker: {
    width: 24,
    height: 24,
    borderWidth: 2,
    padding: 5,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.bgSecondary,
  },
  markerDot: {
    width: 13,
    height: 13,
    borderRadius: "100%",
    backgroundColor: colors.primary,
  },
});

export default AddressCard;
