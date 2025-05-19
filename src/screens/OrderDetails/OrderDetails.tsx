import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import ViewerPedido from "@/src/viewer/ViewerPedido"; // ajuste o caminho se necessário
import { PedidoDTO } from "@/src/model/PedidoDTO";
import ProdutoPedido from "@/src/model/ProdutoPedido";
import { colors } from "@/src/utils/styles";
import { SituacaoPedido } from "@/src/model/Pedido";
import { auth } from "@/src/setup/FirebaseSetup";
import ViewerUsuario from "@/src/viewer/ViewerUsuario";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/components/Header/Header";

const viewer = new ViewerPedido();
const viewerUsuario = new ViewerUsuario();

const OrderDetails = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [pedido, setPedido] = useState<PedidoDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [statusSelecionado, setStatusSelecionado] = useState<SituacaoPedido | null>(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const opcoesStatus: SituacaoPedido[] = ["NOVO", "EM_PREPARO", "EM_ENTREGA", "ENTREGUE", "CANCELADO"];

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

  const alterarStatus = async (status: SituacaoPedido) => {
    if (pedido) {
      await viewer.alterarStatus(id, status, pedido);
      setPedido(pedido);
    }
  };

  const formatToReal = (valor: number): string => {
    const valorFormatado = valor.toFixed(2);

    const [inteira, decimal] = valorFormatado.split(".");

    const inteiraComPonto = inteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${inteiraComPonto},${decimal}`;
  };
  
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
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <Header title="Detalhes do Pedido" />
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
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", color: "#fff" }}>
              {item.getNome()} (x{item.getQuantidade()})
            </Text>
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", color: "#fff" }}>
              {formatToReal(item.getPrecoBase() * item.getQuantidade())}
            </Text>
          </View>
        )}
      />

      <View style={styles.totais}>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", color: "#fff" }}>
          Subtotal: {formatToReal(pedido.getSubtotal())}
        </Text>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", color: "#fff" }}>
          Taxa de Serviço: {formatToReal(pedido.getTaxaServico())}
        </Text>
        <Text style={styles.total}>Total: {formatToReal(pedido.getTotal())}</Text>
      </View>

      <Text style={styles.label}>Situação:</Text>
      <Text style={styles.value}>{pedido.getSituacao()}</Text>
      {isAdmin && (
        <View>
          <Text style={styles.label}>Alterar Status:</Text>

          <TouchableOpacity style={styles.selectBox} onPress={() => setMostrarOpcoes(!mostrarOpcoes)}>
            <Text style={styles.selectText}>{statusSelecionado || pedido.getSituacao()}</Text>
          </TouchableOpacity>

          {mostrarOpcoes && (
            <View style={styles.dropdown}>
              {opcoesStatus.map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={async () => {
                    await alterarStatus(status);
                    setStatusSelecionado(status);
                    setMostrarOpcoes(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      <Text style={styles.label}>Pagamento:</Text>
      <Text style={styles.value}>{pedido.getMetodoPagamento()}</Text>
    </SafeAreaView>
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
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  value: {
    marginBottom: 8,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#fff",
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
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#f5f5f5",
  },

  selectText: {
    fontSize: 16,
  },

  dropdown: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default OrderDetails;
