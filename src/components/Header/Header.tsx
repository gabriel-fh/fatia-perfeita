import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  onBackPress?: () => void;
};

const Header = ({ title, onBackPress }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.icon}>
        <Entypo name="chevron-small-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#fff",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    left: 0,
    top: 16,
  }
});

export default Header;
