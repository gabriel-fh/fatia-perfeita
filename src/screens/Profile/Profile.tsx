import { Text, StyleSheet, Button, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { auth } from "@/src/setup/FirebaseSetup";

const Profile = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      {!auth.currentUser ? (
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      ) : (
        <View>
          <Text style={styles.text}>Nome: {auth.currentUser.displayName}</Text>
          <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
          <Text style={styles.text}>UID: {auth.currentUser.uid}</Text>
          <Button
            title="Sair"
            onPress={() => {
              auth.signOut().then(() => {
                navigation.navigate('Main', { screen: 'Home' });
              });
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 12,
  },
});

export default Profile;
