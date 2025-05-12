import React from "react";
import { RoutesParamsType } from "./RoutesParamsType";
import Screens from "./Screens";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = RoutesParamsType;

export function Routes() {
  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
}
