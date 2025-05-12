import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../utils/styles";
import Header from "./components/Header";
import ViewerProduto from "@/src/viewer/ViewerProduto";
import Produto from "@/src/model/Produto";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
const viewer = new ViewerProduto();

const Home = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await viewer.carregarProdutos();

      setProdutos(data);
    };

    fetchData();
  }, []);

  // const filteredProducts = products.filter((product) => {
  //   if (currentProducts === 1) {
  //     return product.tipo === "PIZZA";
  //   } else if (currentProducts === 2) {
  //     return product.tipo === "SOBREMESA";
  //   } else if (currentProducts === 3) {
  //     return product.tipo === "BEBIDA";
  //   }
  //   return true;
  // });

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />
      <View style={styles.content}>
        <View
          style={{
            paddingBottom: 20,
          }}
        >
          <Header />
          {/* <SubNavigation currentProducts={currentProducts} setcurrentProducts={setcurrentProducts} /> */}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.products}>
            {produtos.map((product) => (
              <ProductCard key={product.getCodigo()} infos={product} />
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
    paddingTop: 10,
    paddingBottom: 30,
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
