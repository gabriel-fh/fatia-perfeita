import { StyleSheet } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Home from "../screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Product from "../screens/Product/Product";
import { Ionicons, FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { colors } from "../utils/styles";
import Profile from "../screens/Profile/Profile";
import Cart from "../screens/Cart/Cart";
import Orders from "../screens/Orders/Orders";
import DaoUsuario from "../model/dao/DaoUsuario";
import { auth } from "../setup/FirebaseSetup";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const daoUsuario = new DaoUsuario();

    const checkUserRole = async () => {
      if (auth.currentUser === null) {
        setIsAdmin(false); // Usuário não autenticado, não é admin
        return; // Usuário não está autenticado, não faz nada
      }
      const user = await daoUsuario.obterUsuarioPeloUID(auth.currentUser?.uid || "");
      if (user) {
        setIsAdmin(user.getFuncao() === "ADMIN");
      }
    };
    checkUserRole();
  }, []);

  const icons = useMemo(
    () => ({
      Home: { icon: "home", type: Ionicons, size: 26 },
      Products: { icon: "pizza-slice", type: FontAwesome6, size: 24 },
      Cart: { icon: "cart-shopping", type: FontAwesome6, size: 24 },
      Orders: { icon: "clipboard-list", type: FontAwesome6, size: 24 },
      Profile: { icon: "user-circle-o", type: FontAwesome, size: 28 },
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
      {isAdmin && <Tab.Screen name="Products" component={Product} options={{ title: "Produtos" }} />}
      <Tab.Screen name="Cart" component={Cart} options={{ title: "Carrinho" }} />
      <Tab.Screen name="Orders" component={Orders} options={{ title: "Pedidos" }} />
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
