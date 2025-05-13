import { Text, StyleSheet, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";

const Login = () => {

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Text style={{ color: "#fff" }}>Login</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});

export default Login;
