import { StyleSheet, ScrollView, Dimensions, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/utils/styles";
import Header from "@/src/components/Header/Header";
import AccordionProducts from "@/src/components/AccordionProducts/AccordionProducts";
import { useCartStore } from "@/src/contexts/Cart";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import AddressInfo from "./components/AddressInfo";
import { useAddress } from "@/src/contexts/Address";
import PaymentMethod from "./components/PaymentMethod";
import PurchaseDetails from "./components/PurchaseDetails";
import Button from "@/src/components/Button/Button";
import { MetodoPagamento, Pedido } from "@/src/model/Pedido";
import { auth } from "@/src/setup/FirebaseSetup";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";
import ViewerPedido from "@/src/viewer/ViewerPedido";

const viewer = new ViewerPedido();
const viewerUsuario = new ViewerUsuario();

const Checkout = () => {
  const { cart, getCartValue } = useCartStore();
  const { address: endereco } = useAddress();
  const [paymentMethod, setPaymentMethod] = useState<MetodoPagamento>("DINHEIRO");

  const RenderItem = () => {
    return cart.map((item) => <ProductCard key={item.getCodigo()} infos={item} variant="cart" />);
  };

  const onSubmit = async () => {
    const subTotal = getCartValue();
    const taxaDeServico = 5; // Defina a taxa de serviço aqui
    const total = subTotal + taxaDeServico;
    if (!auth.currentUser?.uid) {
      return;
    }
    console.log(endereco);
    
    const usuario = await viewerUsuario.carregarUsuario(auth.currentUser.uid);

    if (!usuario || !endereco) {
      return;
    }

    const pedido = new Pedido(subTotal, taxaDeServico, total, "NOVO", paymentMethod, usuario, endereco);

    pedido.setProdutos(cart);

    await viewer.incluirPedido(pedido);
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title="Confirmar Pedido" />
      <ScrollView>
        <AccordionProducts>
          <RenderItem />
        </AccordionProducts>
        {endereco && <AddressInfo address={endereco} />}
        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        <PurchaseDetails cartValue={getCartValue()} />
      </ScrollView>
      <View style={styles.floatButton}>
        <Button title={"Finalizar Pedido"} onPress={onSubmit} />
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
