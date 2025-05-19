import ModelError from "./ModelError";

export default class ProdutoPedido {
  private prodId!: string;
  private pedidoId!: string;
  private quantidade!: number;

  constructor(prodId: string, pedidoId: string, quantidade: number) {
    this.setProdId(prodId);
    this.setPedidoId(pedidoId);
    this.setQuantidade(quantidade);
  }

  getProdId(): string {
    return this.prodId;
  }

  getPedidoId(): string {
    return this.pedidoId;
  }

  getQuantidade(): number {
    return this.quantidade;
  }

  setProdId(prodId: string): void {
    ProdutoPedido.isNull(prodId, "Produto ID");
    this.prodId = prodId;
  }

  setPedidoId(pedidoId: string): void {
    ProdutoPedido.isNull(pedidoId, "Pedido ID");
    this.pedidoId = pedidoId;
  }

  setQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ModelError("Quantidade deve ser maior que zero");
    }
    this.quantidade = quantidade;
  }

  static isNull(value: string, name: string): void {
    if (value === null || value === undefined || value.trim() === "") {
      throw new ModelError(`${name} não pode ser nulo ou vazio`);
    }
  }
}
