import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useCartStore } from "@/src/contexts/Cart";
import Header from "@/src/components/Header/Header";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import Button from "@/src/components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/src/routes/Routes";
import { auth } from "@/src/setup/FirebaseSetup";
const Cart = () => {
  const { cart, clearCartItems, getTotalItemsInCart } = useCartStore();
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const handleCheckout = () => {
    if (!auth.currentUser) {
      navigation.navigate("Login");
      return;
    }
    navigation.navigate("Checkout");
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title={"Meu Carrinho"} />
      <View style={styles.header}>
        <Text style={styles.title}>Carrinho ({getTotalItemsInCart()} itens)</Text>
        {cart.length > 0 && (
          <TouchableOpacity onPress={clearCartItems}>
            <Text style={styles.clear}>Limpar Tudo</Text>
          </TouchableOpacity>
        )}
      </View>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.getCodigo()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ProductCard infos={item} variant="cart" />}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <View style={styles.floatButton}>
            <Button title={"Continuar"} onPress={handleCheckout} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#fff",
  },
  clear: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: "SpaceGrotesk_500Medium",
  },
  empty: {
    textAlign: "center",
    fontFamily: "SpaceGrotesk_500Medium",
    color: "#fff", 
    marginTop: 50,
    fontSize: 16,
  },
  floatButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 5,
    paddingHorizontal: 16,
    width: Dimensions.get("window").width,
    backgroundColor: colors.bgPrimary,
  },
});

export default Cart;
