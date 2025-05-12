import React from "react";
import { RootStackParamList } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart/Cart";
import TabNavigator from "./TabNavigator";

const Screens = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      id={"MainStackbNavigator" as unknown as undefined}
      initialRouteName={"Main"}
      screenOptions={{ headerShown: false, animation: "slide_from_right", animationTypeForReplace: "push" }}
    >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

export default Screens;
