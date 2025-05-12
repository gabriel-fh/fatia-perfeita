import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import Home from "../screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const icons = useMemo(
    () => ({
      Home: { icon: "home", type: AntDesign },
      Products: { icon: "shoppingcart", type: AntDesign },
      Orders: { icon: "list-alt", type: FontAwesome5 },
      User: { icon: "user", type: AntDesign },
    }),
    []
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const { icon, type: IconComponent } = icons[route.name];
          return <IconComponent name={icon} size={focused ? 28 : 24} color={focused ? "#29ABE2" : "#999"} />;
        },
        tabBarActiveTintColor: "#29ABE2",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Início" }} />
      <Tab.Screen name="Products" component={Home} options={{ title: "Produtos" }} />
      <Tab.Screen name="Orders" component={Home} options={{ title: "Pedidos" }} />
      <Tab.Screen name="User" component={Home} options={{ title: "Usuário" }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    height: 60,
    backgroundColor: "#FFF",
    borderTopWidth: 0,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 12,
  },
});

export default TabNavigator;
