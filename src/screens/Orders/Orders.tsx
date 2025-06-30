import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { PedidoDTO } from "@/src/model/PedidoDTO";
import { colors } from "@/src/utils/styles";
import { auth } from "@/src/setup/FirebaseSetup";
import { useFocusEffect } from "@react-navigation/native";
import Header from "@/src/components/Header/Header";
import NotAuth from "@/src/components/NoAuth/NotAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "./components/OrderCard";
import CtrlManterPedidos from "@/src/controller/CtrlManterPedidos";
import CtrlManterUsuarios from "@/src/controller/CtrlManterUsuarios";

const ctrl = new CtrlManterPedidos();
const ctrlUsuario = new CtrlManterUsuarios();


const Orders = () => {
  const [pedidos, setPedidos] = useState<PedidoDTO[] | null>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userData = await ctrlUsuario.carregarUsuario(user.uid);
        userData && setIsAdmin(userData.getFuncao() === "ADMIN");
      }
    };

    checkUserRole();
  }, []);

  useFocusEffect(() => {
    const fetchPedidos = async () => {
      const pedidos = isAdmin
        ? await ctrl.carregarPedidos()
        : await ctrl.carregarPedidosDoUsuario(auth.currentUser?.uid || "");

      setPedidos(pedidos);
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchPedidos();
      } else {
        setPedidos(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  });


  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title="Pedidos" />
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !auth.currentUser ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <NotAuth />
        </View>
      ) : pedidos && pedidos?.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <OrderCard item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>Nenhum pedido encontrado</Text>
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
  title: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk_600SemiBold",
    marginBottom: 12,
    color: "#fff",
  },
});

export default Orders;
