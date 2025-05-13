import { Text, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { colors } from "@/src/utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "@/src/contexts/Cart";
import ProductCard from "@/src/components/ProductCard/ProductCard";

const Cart = () => {
  const { cart, removeProductFromCart, addProductToCart } = useCartStore();
  console.log(cart);
  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Meu Carrinho</Text>
        <ScrollView style={styles.products} showsVerticalScrollIndicator={false}>
          {cart.map((product) => (
            <ProductCard key={product.id} variant="secondary" infos={undefined}  />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  content: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 20,
  },
  products : {
    paddingVertical: 20,
  }
});

export default Cart;
