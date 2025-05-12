import React, { useState } from "react";
import { StyleSheet, StatusBar, SafeAreaView, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../utils/styles";
import Header from "./components/Header";
import SubNavigation from "./components/SubNavigation";

const Home = () => {
  const [currentProducts, setcurrentProducts] = useState<number>(1);

  const products: Product[] = [
    {
      codigo: "1",
      nome: "Pizza 4 Queijos 20cm",
      preco_base: 20.0,
      descricao: "Molho de Tomate, Mozzarella, Gotas de Requeijão Cremoso, Gorgonzola e Parmesão.",
      imagem: "https://cdn.glitch.global/5f40ca2f-f96b-493b-806d-4711b651a143/Image%201.png?v=1744044807617",
      tipo: "PIZZA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "2",
      nome: "Pizza 4 Queijos 20cm",
      preco_base: 20.0,
      descricao: "Molho de Tomate, Mozzarella, Gotas de Requeijão Cremoso, Gorgonzola e Parmesão.",
      imagem: "https://cdn.glitch.global/5f40ca2f-f96b-493b-806d-4711b651a143/Image%201.png?v=1744044807617",
      tipo: "PIZZA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "3",
      nome: "Pizza 4 Queijos 20cm",
      preco_base: 20.0,
      descricao: "Molho de Tomate, Mozzarella, Gotas de Requeijão Cremoso, Gorgonzola e Parmesão.",
      imagem: "https://cdn.glitch.global/5f40ca2f-f96b-493b-806d-4711b651a143/Image%201.png?v=1744044807617",
      tipo: "PIZZA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "4",
      nome: "Pizza 4 Queijos 20cm",
      preco_base: 20.0,
      descricao: "Molho de Tomate, Mozzarella, Gotas de Requeijão Cremoso, Gorgonzola e Parmesão.",
      imagem: "https://cdn.glitch.global/5f40ca2f-f96b-493b-806d-4711b651a143/Image%201.png?v=1744044807617",
      tipo: "PIZZA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "5",
      nome: "Pizza 4 Queijos 20cm",
      preco_base: 20.0,
      descricao: "Molho de Tomate, Mozzarella, Gotas de Requeijão Cremoso, Gorgonzola e Parmesão.",
      imagem: "https://cdn.glitch.global/5f40ca2f-f96b-493b-806d-4711b651a143/Image%201.png?v=1744044807617",
      tipo: "PIZZA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "6",
      nome: "Pizza Doce de Chocolate com Morango",
      preco_base: 20.0,
      descricao:
        "Chocolate com Morango (com massa crocante, ganache de chocolate, morango, sorvete de creme e castanha)",
      imagem:
        "https://alo-storage.nyc3.digitaloceanspaces.com/alo-laravel/public/images/p/Pizza%20Chocolate%20com%20Morango%20-%20Casa%20de%20Pedra.jpg",
      tipo: "SOBREMESA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "7",
      nome: "Pizza Doce de Chocolate com Morango",
      preco_base: 20.0,
      descricao:
        "Chocolate com Morango (com massa crocante, ganache de chocolate, morango, sorvete de creme e castanha)",
      imagem:
        "https://alo-storage.nyc3.digitaloceanspaces.com/alo-laravel/public/images/p/Pizza%20Chocolate%20com%20Morango%20-%20Casa%20de%20Pedra.jpg",
      tipo: "SOBREMESA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "8",
      nome: "Coca 1,5L",
      preco_base: 20.0,
      descricao: "Coca-Cola Garrafa 1,5L",
      imagem: "https://www.extramercado.com.br/img/uploads/1/458/24911458x200x200.jpg",
      tipo: "BEBIDA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "9",
      nome: "Coca 1,5L",
      preco_base: 20.0,
      descricao: "Coca-Cola Garrafa 1,5L",
      imagem: "https://www.extramercado.com.br/img/uploads/1/458/24911458x200x200.jpg",
      tipo: "BEBIDA",
      situacao: "DISPONIVEL",
    },
    {
      codigo: "10",
      nome: "Coca 1,5L",
      preco_base: 20.0,
      descricao: "Coca-Cola Garrafa 1,5L",
      imagem: "https://www.extramercado.com.br/img/uploads/1/458/24911458x200x200.jpg",
      tipo: "BEBIDA",
      situacao: "DISPONIVEL",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (currentProducts === 1) {
      return product.tipo === "PIZZA";
    } else if (currentProducts === 2) {
      return product.tipo === "SOBREMESA";
    } else if (currentProducts === 3) {
      return product.tipo === "BEBIDA";
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />
      <View style={styles.content}>
        <View style={{
          paddingBottom: 20,
        }}>
          <Header />
          <SubNavigation currentProducts={currentProducts} setcurrentProducts={setcurrentProducts} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.products}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.codigo} infos={product} />
            ))}
          </View>
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
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
  },
});

export default Home;
