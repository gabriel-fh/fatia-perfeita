import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { PedidoDTO } from "@/src/model/PedidoDTO";
import { colors } from "@/src/utils/styles";
import ViewerPedido from "@/src/viewer/ViewerPedido";
import { auth } from "@/src/setup/FirebaseSetup";
import { RootStackParamList } from "@/src/routes/Routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";

const viewer = new ViewerPedido();
const viewerUsuario = new ViewerUsuario();

const Orders = () => {
  const [pedidos, setPedidos] = useState<PedidoDTO[]>();
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userData = await viewerUsuario.carregarUsuario(user.uid);
        userData && setIsAdmin(userData.getFuncao() === "ADMIN");
      }
    };

    checkUserRole();
  }, []);

  useFocusEffect(() => {
    const fetchPedidos = async () => {
      const pedidos = isAdmin
        ? await viewer.carregarPedidos()
        : await viewer.carregarPedidosDoUsuario(auth.currentUser?.uid || "");

      setPedidos(pedidos);
    };
    fetchPedidos();
  });

  const formatToReal = (valor: number): string =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  const formatDate = (date: Date) =>
    new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderItem = ({ item }: { item: PedidoDTO }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("OrderDetails", {
          id: item.getId(),
        })
      }
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.situacao}>{item.getSituacao()}</Text>
        <Text style={styles.data}>{formatDate(item.getData())}</Text>
      </View>
      <Text style={styles.total}>Total: {formatToReal(item.getTotal())}</Text>
      <Text style={styles.itens}>{item.getProdutos().length} itens</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
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
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.bgTertiary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  situacao: {
    fontWeight: "bold",
  },
  data: {
    color: "#999",
    fontSize: 12,
  },
  total: {
    fontSize: 16,
    marginTop: 8,
  },
  itens: {
    marginTop: 4,
  },
});

export default Orders;
