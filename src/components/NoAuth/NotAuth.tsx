import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Button from "../Button/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const NotAuth = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você não está autenticado!</Text>
      <Image
        source={require("../../../assets/Login.png")}
        style={styles.image}
        contentFit="contain"
        transition={1000}
      />
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Button title="Fazer Login" onPress={() => navigation.navigate("Login")} />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    maxWidth: 600,
    paddingVertical: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_600SemiBold",
    textAlign: "center",
    paddingTop: 20,
    color: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  link: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
    textAlign: "center",
    color: "#fff",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default NotAuth;
