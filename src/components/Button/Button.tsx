import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { colors } from "@/src/utils/styles";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>

};

const Button = ({ title, style, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 16,
  },
});

export default Button;
