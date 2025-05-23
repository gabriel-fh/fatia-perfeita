import DaoPedido from "../model/dao/DaoPedido";
import { Pedido, SituacaoPedido } from "../model/Pedido";
import { PedidoDTO } from "../model/PedidoDTO";
import ViewerPedido from "../viewer/ViewerPedido";

export default class CtrlManterPedidos {
  viewer: ViewerPedido;
  #dao = new DaoPedido();
  
  constructor(viewer: ViewerPedido) {
    this.viewer = viewer;
  }

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

  async incluir(pedido: Pedido) {
    const refPedido = await this.#dao.realizarPedido(pedido);
    return refPedido;
  }

  async alterar(pedidoId: string, status: SituacaoPedido, pedido: PedidoDTO) {
    const refPedido = await this.#dao.alterarStatus(pedidoId, status, pedido);
    return refPedido;
  }

}
