import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AddRemoveButton from "./AddRemoveButton";
import Produto from "@/src/model/Produto";
import { colors } from "@/src/utils/styles";

type ProductCardProps = {
  infos: Produto
  variant?: "default" | "cart";
};

const ProductCard = ({ infos, variant = "default" }: ProductCardProps) => {
  const formatToReal = (valor: number | bigint | Intl.StringNumericLiteral): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={variant === "cart" ? styles.containerCartVariant : styles.container}
      accessible={true}
      activeOpacity={0.5}
      accessibilityLabel="Botão de acessar tela do produto"
      accessibilityHint={`Navegar para a tela do produto ${infos?.getNome()}`}
      accessibilityRole="link"
    >
      <View style={variant === "cart" ? styles.imgContainerCartVariant : styles.imgContainer}>
        {infos.getImagem() ? (
          <Image
            source={{ uri: infos.getImagem() }}
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
      <View style={{ width: "100%"}}>
        <View>
          <Text style={styles.text} numberOfLines={2}>
            {infos?.getNome()}
          </Text>
          <Text style={styles.title}>{formatToReal(infos.getPrecoBase())}</Text>
        </View>
        <View style={variant === "cart" ? styles.addRemove : {}}>
          <AddRemoveButton produto={infos} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 280,
    backgroundColor: colors.bgTertiary,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 8,
    marginBottom: 20,
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
  title: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    color: "#787878",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    marginTop: 5,
  },

  //

  containerCartVariant: {
    flexDirection: "row",
    backgroundColor: colors.bgTertiary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
  },

  imgContainerCartVariant: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 8,
    marginRight: 10,
  },

  addRemove: {
    width: 200,
  },
});

export default ProductCard;
