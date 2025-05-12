import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  const date = new Date();

  // Mapeamentos exatos para abreviações em PT-BR
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const weekday = weekdays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${weekday}. ${day} ${month} ${year}`;

  return (
    <View>
      <Text style={styles.title}>Fatia Perfeita</Text>
      <Text style={styles.text}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {},
  title: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 22,
  },
  text: {
    color: "#787878",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 15,
    marginTop: 5,
  },
});

export default Header;
