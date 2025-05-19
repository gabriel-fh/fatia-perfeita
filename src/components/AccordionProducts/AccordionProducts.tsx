import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "@/src/utils/styles";
import { Entypo } from "@expo/vector-icons";

const AccordionProducts = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.container}
        accessible={true}
        accessibilityLabel="Botão de ver carrinho"
        accessibilityHint={`Clique para ver o carrinho`}
        accessibilityRole="button"
      >
        <Text style={styles.text}>{!isVisible ? "Ver" : "Minimizar"} produtos</Text>

        <Entypo name={isVisible ? "chevron-small-up" : "chevron-small-down"} color={colors.primary} size={25} />
      </TouchableOpacity>
      {isVisible && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgTertiary,
    borderRadius: 8,
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
  },
});

export default AccordionProducts;
