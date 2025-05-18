import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { useCartStore } from "@/src/contexts/Cart";
import Produto, { SituacaoProduto, TipoProduto } from "@/src/model/Produto";
import Header from "@/src/components/Header/Header";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import Button from "@/src/components/Button/Button";

const Cart = () => {
  const { cart, clearCartItems, getTotalItemsInCart } = useCartStore();

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
        <FlatList
          data={cart}
          keyExtractor={(item) => item.codigo}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              infos={
                new Produto(
                  item.codigo,
                  item.nome,
                  item.imagem,
                  item.descricao,
                  item.tipo as TipoProduto,
                  item.preco_base,
                  item.situacao as SituacaoProduto
                )
              }
              variant="cart"
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <View style={styles.floatButton}>
        <Button
          title={"Continuar"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </View>
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
