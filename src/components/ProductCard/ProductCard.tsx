import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../utils/styles";
import AddRemoveButton from "./AddRemoveButton";
import PrimaryCard from "./PrimaryCard";
import SecondaryCard from "./SecondaryCard";

type ProductCardProps = {
  infos: Product;
  variant?: "primary" | "secondary";
};

const ProductCard = ({ infos, variant = "primary" }: ProductCardProps) => {
  const formatToReal = (valor: number | bigint | Intl.StringNumericLiteral): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return variant === "primary" ? <PrimaryCard infos={infos} formatToReal={formatToReal} /> : <SecondaryCard />;
};

const styles = StyleSheet.create({
  containter: {
    width: 180,
    height: 275,
    backgroundColor: colors.bgTertiary,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  imgContainer: {
    width: 143,
    height: 143,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 8,
  },
  infoContainer: {
    width: "100%",
    height: 275 * 0.45,
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
  text: {
    color: "#787878",
    textDecorationLine: "line-through",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 15,
    marginTop: 5,
  },
});

export default ProductCard;
