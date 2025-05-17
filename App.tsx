import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";
import AnimatedSplash from "react-native-animated-splash-screen";
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { Routes } from "./src/routes/Routes";
import { ActivityIndicator, View } from "react-native";
// import FlashMessage from "react-native-flash-message";

// import Toast from "react-native-toast-message";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const appRoutes = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#1b1f2b" }}>
        {fontsLoaded ? <Routes /> : <ActivityIndicator style={{ flex: 1 }} />}
      </View>
    );
  };

  return (
    <>
      <AnimatedSplash
        translucent={true}
        isLoaded={appIsReady}
        logoImage={require("./assets/logo.png")}
        backgroundColor={"#1b1f2b"}
        logoHeight={200}
        logoWidth={200}
      >
        {appRoutes()}
      </AnimatedSplash>
    </>
  );
}
