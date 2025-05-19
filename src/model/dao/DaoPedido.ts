import { database } from "@/src/setup/FirebaseSetup";
import { get, push, ref, set } from "firebase/database";
import { Pedido } from "../Pedido";

export default class DaoPedido {
  async realizarPedido(pedido: Pedido) {
    const dbRefNovoPedido = ref(database, `pedidos`);
    const novoPedidoRef = push(dbRefNovoPedido);
    const pedidoId = novoPedidoRef.key;

    try {
      const dbRefNovoPedido = ref(database, `/pedidos/${pedidoId}`);
      await set(dbRefNovoPedido, { ...pedido });
      const dbRefCliente = ref(database, `/usuarios/${pedido.getUserUid()}/pedidos/${pedidoId}`);
      await set(dbRefCliente, true);
      const dbRefEndereco = ref(database, `/enderecos/${pedido.getEnderecoId()}/pedidos/${pedidoId}`);
      await set(dbRefEndereco, true);
      const dbRefProduto = ref(database, `/produtos/${pedido.getProdutos().map(produto => produto.getCodigo())}/pedidos/${pedidoId}`);
      await set(dbRefProduto, true);
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
