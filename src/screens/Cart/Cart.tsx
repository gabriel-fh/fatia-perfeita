import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import { CartItem, useCartStore } from "@/src/contexts/Cart";
import AddRemoveButton from "@/src/components/ProductCard/AddRemoveButton";
import Produto, { SituacaoProduto, TipoProduto } from "@/src/model/Produto";

const Cart = () => {
  const { cart, clearCartItems, getTotalItemsInCart } = useCartStore();

  const renderItem = ({ item }: { item: CartItem }) => {
    if (!item) return null;

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.nome}</Text>
          <Text style={styles.price}>R$ {item.preco_base?.toFixed(2)}</Text>
          <AddRemoveButton
            produto={
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
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
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
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
    fontSize: 18,
    fontWeight: "bold",
  },
  clear: {
    color: "red",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#555",
  },
  quantity: {
    color: "#777",
  },
  remove: {
    color: "red",
    marginTop: 4,
  },
});

export default Cart;
