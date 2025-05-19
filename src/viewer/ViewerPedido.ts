import CtrlManterPedidos from "../controller/CtrlManterPedidos";
import { Pedido } from "../model/Pedido";

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
}
