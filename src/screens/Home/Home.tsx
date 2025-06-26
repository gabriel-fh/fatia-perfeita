import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../utils/styles";
import Header from "./components/Header";
import Produto from "@/src/model/Produto";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import { SafeAreaView } from "react-native-safe-area-context";
import SubNavigation from "./components/SubNavigation";
import { useFocusEffect } from "@react-navigation/native";
import CtrlManterProdutos from "@/src/controller/CtrlManterProdutos";
const ctrl = new CtrlManterProdutos();

const Home = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [currentProducts, setcurrentProducts] = useState(1);

  const fetchData = async () => {
    const data = await ctrl.carregarProdutos();
    setProdutos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const filteredProducts = produtos.filter((product) => {
    if (currentProducts === 1) {
      return product.getTipo() === "PIZZA";
    } else if (currentProducts === 2) {
      return product.getTipo() === "SOBREMESA";
    } else if (currentProducts === 3) {
      return product.getTipo() === "BEBIDA";
    }
    return true;
  });

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
          <SubNavigation currentProducts={currentProducts} setcurrentProducts={setcurrentProducts} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.products}>
            {filteredProducts.map((product) => (
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
    paddingBottom: 5,
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
    gap: 10,
    marginTop: 30,
  },
});

export default Home;
