import { Text, StyleSheet, Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import Button from "@/src/components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";

const FirstPage = () => {
    const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  
  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "bottom"]}>
      <Image source={require("../../../assets/fsimg.jpg")} style={styles.image} resizeMode="cover" blurRadius={0.5} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title}>Bem vindo à Fatia Perfeita</Text>
          <Text style={styles.text}>Onde cada pedaço é feito com equilíbrio, carinho e queijo.</Text>
        </View>
        <Button title="Clique para continuar" onPress={() => navigation.navigate("Address", {add: false})} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.7,

  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    minHeight: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between",
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk_600SemiBold",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_400Regular",
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
});

export default FirstPage;
