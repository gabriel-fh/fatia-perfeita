import CtrlManterPedidos from "../controller/CtrlManterPedidos";
import { Pedido, SituacaoPedido } from "../model/Pedido";
import { PedidoDTO } from "../model/PedidoDTO";

export default class ViewerPedido {
  #ctrl: CtrlManterPedidos;

  constructor() {
    this.#ctrl = new CtrlManterPedidos(this);
  }

  async carregarPedidos() {
    const data = await this.#ctrl.carregarPedidos();

    return data;
  }

  async carregarPedido(pedidoId: string) {
    const data = await this.#ctrl.carregarPedido(pedidoId);

    return data;
  }

  async carregarPedidosDoUsuario(uid: string) {
    const data = await this.#ctrl.carregarPedidosDoUsuario(uid);

    return data;
  }

  async incluirPedido(pedido: Pedido) {
    return this.#ctrl.incluir(pedido);
  }

  async alterarStatus(pedidoId: string, status: SituacaoPedido, pedido: PedidoDTO) {
    const refPedido = await this.#ctrl.alterar(pedidoId, status, pedido);
    return refPedido;
  }

}
