import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../utils/styles";
import AddRemoveButton from "./AddRemoveButton";

const ProductCard = ({ infos }: { infos: Product }) => {
  const formatToReal = (valor: number | bigint | Intl.StringNumericLiteral): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={styles.containter}
      accessible={true}
      activeOpacity={0.5}
      accessibilityLabel="Botão de acessar tela do produto"
      accessibilityHint={`Navegar para a tela do produto ${infos?.nome}`}
      accessibilityRole="link"
    >
      <View style={styles.imgContainer}>
        {infos.imagem ? (
          <Image
            source={{ uri: infos.imagem }}
            style={{
              width: "100%",
              height: "100%",
              marginTop: -60,
            }}
          />
        ) : (
          <MaterialIcons name="image-not-supported" size={24} color="black" />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{formatToReal(infos.preco_base)}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {infos?.nome}
        </Text>
        <AddRemoveButton />
      </View>
    </TouchableOpacity>
  );
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
