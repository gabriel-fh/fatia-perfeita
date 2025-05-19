import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/src/utils/styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const Options = ({ handleLogout }: { handleLogout: () => Promise<void> }) => {
    const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  
  const options = [
    {
      icon: "info-circle" as const,
      label: "Minhas Informações",
      onPress: () => console.log("Editar Perfil Pressed"),
    },
    {
      icon: "map-marker" as const,
      label: "Meus Endereços",
      onPress: () => navigation.navigate("MyAddresses"),
    },
    {
      icon: "power-off" as const,
      label: "Sair",
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={option.onPress}
          style={[
            styles.option,
            {
              borderBottomWidth: index < options.length - 1 ? 1 : 0,
              borderBottomColor: colors.bgPrimary,
            },
          ]}
        >
          <FontAwesome name={option.icon} size={22} color={option.label === "Sair" ? colors.primary : "#fff"} />
          <Text style={styles.text}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    marginTop: 15,
    backgroundColor: colors.bgSecondary,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "SpaceGrotesk_400Regular",
    marginLeft: 20,
  },
});

export default Options;
