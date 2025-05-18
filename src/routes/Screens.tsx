import React, { useEffect, useState } from "react";
import { RootStackParamList } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart/Cart";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile/Profile";
import Login from "../screens/Login/Login";
import SignUp from "../screens/SignUp/SignUp";
import Address from "../screens/Address/Address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirstPage from "../screens/FirstPage/FirstPage";

const Screens = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const address = await AsyncStorage.getItem("address");
        if (address) {
          setAddress(address);
        }
      } catch (error) {
        console.error("Error retrieving address from AsyncStorage:", error);
      }
    })();
  }, []);

  return (
    <Stack.Navigator
      id={"MainStackbNavigator" as unknown as undefined}
      initialRouteName={address ? "Main" : "FirstPage"}
      screenOptions={{ headerShown: false, animation: "slide_from_right", animationTypeForReplace: "push" }}
    >
      {address ? (
        <>
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Main" component={TabNavigator} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }} />
        </>
      ) : (
        <Stack.Screen name="FirstPage" component={FirstPage} options={{ gestureEnabled: false }} />
      )}
      <Stack.Screen name="Address" component={Address} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
};

export default Screens;
