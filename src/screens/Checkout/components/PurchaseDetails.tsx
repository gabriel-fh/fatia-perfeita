import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/src/utils/styles";

type PurchaseDetailsProps = {
  cartValue: number;
};

const formatToReal = (valor: number | bigint | Intl.StringNumericLiteral): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

const PurchaseDetails = ({ cartValue }: PurchaseDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da compra</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Subtotal:</Text>
        <Text style={styles.infoText}>{formatToReal(cartValue)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Taxa de serviço:</Text>
        <Text style={styles.infoText}>R$ 5,00</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Valor total:</Text>
        <Text style={[styles.infoText, {color: colors.primary}]}>{formatToReal(cartValue + 5)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgTertiary,
    borderRadius: 8,
    width: "100%",
    padding: 16,
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
    fontFamily: "SpaceGrotesk_500Medium",
    marginBottom: 10,
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    color: "#908f8f",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
  },
});

export default PurchaseDetails;
