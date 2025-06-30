import DaoPedido from "../model/dao/DaoPedido";
import { Pedido, SituacaoPedido } from "../model/Pedido";
import { PedidoDTO } from "../model/PedidoDTO";

export default class CtrlManterPedidos {
  #dao = new DaoPedido();

  async carregarPedidos() {
    const pedidos = await this.#dao.obterPedidos();
    return pedidos;
  }

  async carregarPedido(pedidoId: string) {
    const pedido = await this.#dao.obterPedidoPorId(pedidoId);
    return pedido;
  }

  async carregarPedidosDoUsuario(uid: string) {
    const pedidos = await this.#dao.obterPedidosDoUsuario(uid);
    return pedidos;
  }

  async incluirPedido(pedido: Pedido) {
    const refPedido = await this.#dao.realizarPedido(pedido);
    return refPedido;
  }

  async alterarStatus(pedidoId: string, status: SituacaoPedido, pedido: PedidoDTO) {
    const refPedido = await this.#dao.alterarStatus(pedidoId, status, pedido);
    return refPedido;
  }

}
