import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/src/utils/styles";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

type PaymentMethodProps = {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
};

const paymentOptions = [
  { label: "Cartão de Crédito", value: "CARTAO_DE_CREDITO", Icon: FontAwesome, iconName: "credit-card-alt" },
  { label: "Dinheiro", value: "DINHEIRO", Icon: FontAwesome5, iconName: "money-bill-wave" },
  { label: "Pix", value: "PIX", Icon: FontAwesome6, iconName: "pix" },
];

const PaymentMethod = ({ paymentMethod, setPaymentMethod }: PaymentMethodProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pagamento:</Text>
      <Text style={styles.subtitle}>Pagamento apenas na entrega</Text>

      {paymentOptions.map(({ label, value, Icon, iconName }, index) => (
        <TouchableOpacity
          key={value}
          style={[styles.method, index === paymentOptions.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}
          onPress={() => setPaymentMethod(value)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={iconName} size={20} color={colors.primary} />
            <Text style={styles.text}>{label}</Text>
          </View>

          <View style={[styles.marker, { borderColor: paymentMethod === value ? colors.primary : colors.bgSecondary }]}>
            {paymentMethod === value && <View style={styles.markerDot}></View>}
          </View>
        </TouchableOpacity>
      ))}
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
  },
  subtitle: {
    color: "#908f8f",
    marginBottom: 10,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 16,
    marginLeft: 15,
  },
  method: {
    paddingVertical: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.bgPrimary,
    alignItems: "center",
    justifyContent: "space-between",
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

export default PaymentMethod;
