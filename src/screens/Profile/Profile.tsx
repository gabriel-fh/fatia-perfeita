import { Text, StyleSheet, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useAuth } from "@/src/contexts/Auth";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";

const Profile = () => {
  const { authData } = useAuth();
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      {!authData ? <Button title="Login" onPress={() => navigation.navigate('Login')} /> : <Text style={{ color: "#fff" }}>Profile</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
});

export default Profile;
