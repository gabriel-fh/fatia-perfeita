import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Usuario from "@/src/model/Usuario";
import { colors } from "@/src/utils/styles";

const UserInfo = ({ user }: { user: Usuario }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={43} color="#fff" />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{user.getNome()}</Text>
        <Text style={styles.text}>{user.getTelefone()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 15,
    paddingVertical: 20,
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 12,
  },
  infoContainer: {
    marginLeft: 20,
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 16,
  },
});

export default UserInfo;
