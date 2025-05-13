import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import Home from "../screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Product from "../screens/Product/Product";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../utils/styles";
import Profile from "../screens/Profile/Profile";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const icons = useMemo(
    () => ({
      Home: { icon: "home", type: Ionicons, size: 26 },
      Products: { icon: "pizza-slice", type: FontAwesome6, size: 24 },
      Cart: { icon: "cart-shopping", type: FontAwesome6, size: 24 },
      Orders: { icon: "clipboard-list", type: FontAwesome6, size: 24 },
      Profile: { icon: "person-circle-sharp", type: Ionicons, size: 30 },
    }),
    []
  );
  // <FontAwesome6 name="pizza-slice" size={24} color="black" />
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const routeName = route.name as keyof typeof icons;
          if (routeName in icons) {
            const { icon, type: IconComponent, size } = icons[routeName];
            return <IconComponent name={icon} size={size} color={focused ? colors.primary : "#e2e2e2"} />;
          }
          // Ícone padrão caso a rota não tenha um ícone definido
          return <Ionicons name="help" size={24} color={focused ? colors.primary : "#e2e2e2"} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#e2e2e2",
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Início" }} />
      <Tab.Screen name="Products" component={Product} options={{ title: "Produtos" }} />
      <Tab.Screen name="Cart" component={Home} options={{ title: "Carrinho" }} />
      <Tab.Screen name="Orders" component={Home} options={{ title: "Pedidos" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Perfil" }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: colors.bgTertiary,
    borderTopWidth: 0,
    elevation: 10,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 13,
    marginTop: 7,
  },
});

export default TabNavigator;
