import ModelError from "./ModelError.js";
import Pedido from "./Pedido.js";
import Produto from "./Produto.js";

export default class ProdutoPedido {
  constructor(quantidade, preco, produto, pedido) {
    this.setQuantidade(quantidade);
    this.setPreco(preco);
    this.setProduto(produto);
    this.setPedido(pedido);
  }

  getQuantidade() {
    return this.quantidade;
  }

  getPreco() {
    return this.preco;
  }

  getProduto() {
    return this.produto;
  }

  getPedido() {
    return this.pedido;
  }

  setQuantidade(quantidade) {
    ProdutoPedido.validarQuantidade(quantidade);
    this.quantidade = quantidade;
  }

  setPreco(preco) {
    ProdutoPedido.validarPreco(preco);
    this.preco = preco;
  }

  setProduto(produto) {
    ProdutoPedido.validarProduto(produto);
    this.produto = produto;
  }

  setPedido(pedido) {
    ProdutoPedido.validarPedido(pedido);
    this.pedido = pedido;
  }

  static validarPedido(pedido) {
    if (!(pedido instanceof Pedido)) {
      throw new ModelError("Deve estar associado a um pedido");
    }
  }

  static validarProduto(produto) {
    if (!(produto instanceof Produto)) {
      throw new ModelError("Deve estar associado a um produto");
    }
  }

  static validarQuantidade(quantidade) {
    if (typeof quantidade !== "number" || quantidade <= 0 || !Number.isInteger(quantidade)) {
      throw new ModelError("Quantidade inválida. A quantidade deve ser um número inteiro positivo.");
    }
  }

  static validarPreco(preco) {
    if (typeof preco !== "number" || !isFinite(preco) || preco < 0) {
      throw new ModelError("Preço inválido. O preço deve ser um numero positivo.");
    }
  }
}

