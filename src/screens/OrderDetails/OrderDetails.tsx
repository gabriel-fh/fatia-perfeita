import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import ViewerPedido from "@/src/viewer/ViewerPedido"; // ajuste o caminho se necessário
import { PedidoDTO } from "@/src/model/PedidoDTO";
import ProdutoPedido from "@/src/model/ProdutoPedido";
import { colors } from "@/src/utils/styles";

const viewer = new ViewerPedido();

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  
  const [pedido, setPedido] = useState<PedidoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const result = await viewer.carregarPedido(id);
        
        setPedido(result);
      } catch (error) {
        console.error("Erro ao carregar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [id]);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Pedido não encontrado.</Text>
      </View>
    );
  }

  const endereco = pedido?.getEndereco();
  const user = pedido?.getUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>

      <Text style={styles.label}>Data:</Text>
      <Text style={styles.value}>{formatDate(pedido.getData())}</Text>

      <Text style={styles.label}>Cliente:</Text>
      <Text style={styles.value}>
        {user.getNome()} ({user.getEmail()})
      </Text>

      <Text style={styles.label}>Endereço:</Text>
      <Text style={styles.value}>
        {`${endereco.getRua()}, ${endereco.getNumero()} - ${endereco.getBairro()}\n${endereco.getCidade()} - ${endereco.getCep()}`}
      </Text>

      <Text style={styles.label}>Produtos:</Text>
      <FlatList
        data={pedido.getProdutos()}
        keyExtractor={(item) => item.getCodigo()}
        renderItem={({ item }: { item: ProdutoPedido }) => (
          <View style={styles.produtoItem}>
            <Text>
              {item.getNome()} (x{item.getQuantidade()})
            </Text>
            <Text>{formatToReal(item.getPrecoBase() * item.getQuantidade())}</Text>
          </View>
        )}
      />

      <View style={styles.totais}>
        <Text>Subtotal: {formatToReal(pedido.getSubtotal())}</Text>
        <Text>Taxa de Serviço: {formatToReal(pedido.getTaxaServico())}</Text>
        <Text style={styles.total}>Total: {formatToReal(pedido.getTotal())}</Text>
      </View>

      <Text style={styles.label}>Situação:</Text>
      <Text style={styles.value}>{pedido.getSituacao()}</Text>

      <Text style={styles.label}>Pagamento:</Text>
      <Text style={styles.value}>{pedido.getMetodoPagamento()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.bgPrimary,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 8,
  },
  produtoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  totais: {
    marginTop: 16,
  },
  total: {
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

export default OrderDetails;
