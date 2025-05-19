import CtrlManterPedidos from "../controller/CtrlManterPedidos";
import { Pedido } from "../model/Pedido";

export default class ViewerPedido {
  #ctrl: CtrlManterPedidos;

  constructor() {
    this.#ctrl = new CtrlManterPedidos(this);
  }

  async carregarPedidos() {
    const data = await this.#ctrl.carregar();

    return data;
  }

  async incluirPedido(pedido: Pedido) {
    return this.#ctrl.incluir(pedido);
  }
}
