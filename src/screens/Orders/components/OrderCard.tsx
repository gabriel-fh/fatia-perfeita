import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { colors } from "@/src/utils/styles";
import { PedidoDTO } from "@/src/model/PedidoDTO";

const formatToReal = (valor: number): string => {
  const valorFormatado = valor.toFixed(2);

  const [inteira, decimal] = valorFormatado.split(".");

  const inteiraComPonto = inteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${inteiraComPonto},${decimal}`;
};

const formatDate = (date: Date) =>
  new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const OrderCard = ({ item }: { item: PedidoDTO }) => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const statusColor = () => {
    switch (item.getSituacao()) {
      case "EM_ENTREGA":
        return "#ff9800";
      case "ENTREGUE":
        return "#2196f3";
      case "EM_PREPARO":
        return "yellow";
      case "CANCELADO":
        return "red";
      case "NOVO":
        return "white";
      default:
        return "#fff";
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("OrderDetails", {
          id: item.getId(),
        })
      }
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.situacao, { color: statusColor() }]}>{item.getSituacao()}</Text>
        <Text style={styles.data}>{formatDate(item.getData())}</Text>
      </View>
      <Text style={styles.total}>Total: {formatToReal(item.getTotal())}</Text>
      <Text style={styles.itens}>{item.getProdutos().length} itens</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgTertiary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  situacao: {
    fontFamily: "SpaceGrotesk_500Medium",
    color: "#fff",
  },
  data: {
    color: "#999",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
  },
  total: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#fff",
  },
  itens: {
    marginTop: 4,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#fff",
  },
});

export default OrderCard;
