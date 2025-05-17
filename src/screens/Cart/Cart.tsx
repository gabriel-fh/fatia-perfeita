import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";

const Cart = () => {
  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <View style={styles.container}>
        <Text>Cart</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});

export default Cart;
