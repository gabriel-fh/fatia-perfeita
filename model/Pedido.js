import ModelError from "./ModelError.js";
import Comanda from "./Comanda.js";
import Produto from "/model/Produto.js";
import ProdutoPedido from "./ProdutoPedido.js";

export default class Pedido {
  constructor(codigo, dataHora, situacao, comanda, produtos) {
    this.setCodigo(codigo);
    this.setDataHora(dataHora);
    this.setSituacao(situacao);
    this.setComanda(comanda);
    this.produtos = []; // Inicializa corretamente antes de setar
    this.setProdutos(produtos); // Agora sim, adiciona os produtos de verdade
  }

  getCodigo() {
    return this.codigo;
  }

  getDataHora() {
    return this.dataHora;
  }

  getSituacao() {
    return this.situacao;
  }

  getComanda() {
    return this.comanda;
  }

  getProdutos() {
    return this.produtos;
  }

  setCodigo(codigo) {
    Pedido.validarCodigo(codigo);
    this.codigo = codigo;
  }

  setDataHora(dataHora) {
    Pedido.validarDataHora(dataHora);
    this.dataHora = dataHora;
  }

  setSituacao(situacao) {
    Pedido.validarSituacao(situacao);
    this.situacao = situacao;
  }

  setComanda(comanda) {
    Pedido.validarComanda(comanda);
    this.comanda = comanda;
  }

  setProdutos(produtos) {
    if (!Array.isArray(produtos)) {
      throw new ModelError("Produtos deve ser um array de Produto.");
    }

    produtos.forEach(produto => {
      this.adicionarProduto(produto); // Usa o adicionarProduto já validando
    });
  }

  adicionarProduto(produto) {
    if (produto instanceof ProdutoPedido) {
      this.produtos.push(produto);
      produto.setPedido(this);
    } else {
      throw new ModelError("Objeto não é um produto válido.");
    }
  }

  static validarCodigo(codigo) {
    if (!codigo || (typeof codigo === "string" && !codigo.trim())) {
      throw new ModelError("Código de ve ser uma string não vazia.");
    }
  }

  static validarDataHora(dataHora) {
    const regexDataHora =
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})\s(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])(:([0-5]?[0-9]))?$/;

    if (!regexDataHora.test(dataHora)) {
      throw new ModelError("Data e hora inválidas. O formato deve ser 'dd/mm/aaaa HH:mm' ou 'dd/mm/aaaa HH:mm:ss'.");
    }
  }

  static validarSituacao(situacao) {
    const situacoesValidas = ["EM_PREPARO", "PRONTO", "ENTREGUE", "CANCELADO"];

    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError("Situação inválida. As opções válidas são: EM_PREPARO, PRONTO, ENTREGUE OU CANCELADO.");
    }
  }

  static validarComanda(comanda) {
    if (!(comanda instanceof Comanda)) {
      throw new ModelError("O pedido deve estar associado a uma comanda");
    }
  }
}
