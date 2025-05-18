import React from "react";
import { RoutesParamsType } from "./RoutesParamsType";
import Screens from "./Screens";
import { NavigationContainer } from "@react-navigation/native";
import { AddressProvider } from "../contexts/Address";

export type RootStackParamList = RoutesParamsType;

export function Routes() {
  return (
    <NavigationContainer>
      <AddressProvider>
        <Screens />
      </AddressProvider>
    </NavigationContainer>
  );
}
