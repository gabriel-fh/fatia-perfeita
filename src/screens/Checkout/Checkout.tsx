import { StyleSheet, ScrollView, Dimensions, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import Header from "@/src/components/Header/Header";
import AccordionProducts from "@/src/components/AccordionProducts/AccordionProducts";
import { useCartStore } from "@/src/contexts/Cart";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import Produto, { SituacaoProduto, TipoProduto } from "@/src/model/Produto";
import AddressInfo from "./components/AddressInfo";
import { useAddress } from "@/src/contexts/Address";
import PaymentMethod from "./components/PaymentMethod";
import PurchaseDetails from "./components/PurchaseDetails";
import Button from "@/src/components/Button/Button";

const Checkout = () => {
  const { cart, getCartValue } = useCartStore();
  const { address } = useAddress();
  const [paymentMethod, setPaymentMethod] = useState("DINHEIRO");

  const RenderItem = () => {
    return cart.map((item) => (
      <ProductCard
        key={item.codigo}
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
    ));
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title="Confirmar Pedido" />
      <ScrollView>
        <AccordionProducts>
          <RenderItem />
        </AccordionProducts>
        {address && <AddressInfo address={address} />}
        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        <PurchaseDetails cartValue={getCartValue()} />
      </ScrollView>
      <View style={styles.floatButton}>
        <Button title={"Finalizar Pedido"} onPress={function (): void {
          throw new Error("Function not implemented.");
        } }/>
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
  floatButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: Dimensions.get("window").width,
    backgroundColor: colors.bgPrimary,
  },
});

export default Checkout;
