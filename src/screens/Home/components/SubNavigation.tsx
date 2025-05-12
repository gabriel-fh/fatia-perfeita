import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/src/utils/styles";

type SubNavigationProps = {
  currentProducts: number;
  setcurrentProducts: React.Dispatch<React.SetStateAction<number>>;
};

const SubNavigation = ({ currentProducts, setcurrentProducts }: SubNavigationProps) => {
  const options = [
    { id: 1, title: "Pizzas" },
    { id: 2, title: "Sobremesas" },
    { id: 3, title: "Bebidas" },
  ];

  return (
    <View style={styles.containter}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.touchable}
          onPress={() => setcurrentProducts(option.id)}
          accessible={true}
          accessibilityLabel={`Botão para ver ${option.title}`}
          accessibilityHint={`Visualizar ${option.title}`}
          accessibilityRole="button"
        >
          <Text style={[styles.title, currentProducts === option.id ? styles.active : null]}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    color: "#e6e6e6",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 18,
  },
  touchable: {
    marginRight: 20,
  },
  active: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});

export default SubNavigation;
