import { database } from "@/src/setup/FirebaseSetup";
import { get, push, ref, set } from "firebase/database";
import { Pedido } from "../Pedido";

export default class DaoPedido {
  async realizarPedido(pedido: Pedido) {
    try {
      const dbRefNovoPedido = ref(database, `pedidos`);
      const novoPedidoRef = push(dbRefNovoPedido);
      const pedidoId = novoPedidoRef.key;
      
      if (!pedidoId) throw new Error("Erro ao gerar ID do pedido");

      const produtosSerializados = pedido.getProdutos().map((produto) => ({
        id: produto.getCodigo(),
        nome: produto.getNome(),
        imagem: produto.getImagem(),
        preco: produto.getPrecoBase(),
        quantidade: produto.getQuantidade(),
      }));

      const pedidoParaSalvar = {
        codigo: pedidoId,
        data: pedido.getData().toISOString(),
        subtotal: pedido.getSubtotal(),
        taxaServico: pedido.getTaxaServico(),
        total: pedido.getTotal(),
        situacao: pedido.getSituacao(),
        metodoPagamento: pedido.getMetodoPagamento(),
        usuario: pedido.getUser().getUid(),
        endereco: pedido.getEndereco().getId(),
        produtos: produtosSerializados,
      };

      const dbRefPedidoFinal = ref(database, `/pedidos/${pedidoId}`);
      await set(dbRefPedidoFinal, pedidoParaSalvar);
    } catch (error: any) {
      console.log("#ERRO incluir:", error.code, error.message);
    }
  }

  async alterarStatus(pedidoId: string, novoStatus: string) {
    const dbRefPedido = ref(database, `/pedidos/${pedidoId}`);
    await set(dbRefPedido, { status: novoStatus });
  }

  async obterPedidos() {
    const dbRefPedidos = ref(database, `/pedidos`);
    const snapshot = await get(dbRefPedidos);
    const pedidos = snapshot.val();
    return pedidos;
  }
}
