import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type HeaderProps = {
  title: string;
  goTo?: () => void;
};

const Header = ({ title, goTo }: HeaderProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => (goTo ? goTo() : navigation.goBack())} style={styles.icon}>
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
  },
});

export default Header;
