import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AddRemoveButton from "./AddRemoveButton";
import { colors } from "@/src/utils/styles";

type PrimaryCardProps = {
  infos: Product;
  formatToReal: (valor: number | bigint | Intl.StringNumericLiteral) => string;
};

const PrimaryCard = ({ infos, formatToReal }: PrimaryCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={styles.containter}
      accessible={true}
      activeOpacity={0.5}
      accessibilityLabel="Botão de acessar tela do produto"
      accessibilityHint={`Navegar para a tela do produto ${infos?.getNome()}`}
      accessibilityRole="link"
    >
      <View style={styles.imgContainer}>
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
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{formatToReal(infos.preco_base)}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {infos?.getNome()}
        </Text>
        <AddRemoveButton id={infos.codigo} variant={"primary"} />
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

export default PrimaryCard;
