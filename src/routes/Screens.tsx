import React from "react";
import { RootStackParamList } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart/Cart";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile/Profile";
import Login from "../screens/Login/Login";
import SignUp from "../screens/SignUp/SignUp";
import Address from "../screens/Address/Address";
import FirstPage from "../screens/FirstPage/FirstPage";
import { useAddress } from "../contexts/Address";
import Checkout from "../screens/Checkout/Checkout";
import MyAddresses from "../screens/MyAddresses/MyAddresses";
import OrderDetails from "../screens/OrderDetails/OrderDetails";

const Screens = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const { address } = useAddress();
  return (
    <Stack.Navigator
      id={"MainStackbNavigator" as unknown as undefined}
      initialRouteName={address ? "Main" : "FirstPage"}
      screenOptions={{ headerShown: false, animation: "slide_from_right", animationTypeForReplace: "push" }}
    >
      <Stack.Screen name="Main" component={TabNavigator} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Address" component={Address} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Checkout" component={Checkout} options={{ gestureEnabled: false }} />
      <Stack.Screen name="MyAddresses" component={MyAddresses} options={{ gestureEnabled: false }} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ gestureEnabled: false }} />
      {!address && (
        <>
          <Stack.Screen name="FirstPage" component={FirstPage} options={{ gestureEnabled: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Screens;
