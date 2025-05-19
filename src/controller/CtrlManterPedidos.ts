import DaoPedido from "../model/dao/DaoPedido";
import { Pedido } from "../model/Pedido";
import ViewerPedido from "../viewer/ViewerPedido";

export default class CtrlManterPedidos {
  viewer: ViewerPedido;
  #dao = new DaoPedido();
  
  constructor(viewer: ViewerPedido) {
    this.viewer = viewer;
  }

  async carregar() {
    const pedidos = await this.#dao.obterPedidos();
    return pedidos;
  }

  async incluir(pedido: Pedido) {
    const refPedido = await this.#dao.realizarPedido(pedido);
    return refPedido;
  }

  // async alterar(pedido: Pedido) {
  //   const refPedido = await this.#dao.alterarStatus(pedido.get, pedido.getStatus());
  //   return refPedido;
  // }

}
