import ModelError from "./ModelError.js";
import Pedido from "./Pedido.js";

export default class Produto {
  constructor(nome, imagem, descricao, tipo, precoBase, situacao) {
    this.setNome(nome);
    this.setImagem(imagem);
    this.setDescricao(descricao);
    this.setTipo(tipo);
    this.setPrecoBase(precoBase);
    this.setSituacao(situacao);
    this.pedidos = [];
  }

  getNome() {
    return this.nome;
  }

  getImagem() {
    return this.imagem;
  }

  getDescricao() {
    return this.descricao;
  }

  getTipo() {
    return this.tipo;
  }

  getPrecoBase() {
    return this.precoBase;
  }

  getSituacao() {
    return this.situacao;
  }

  getPedidos() {
    return this.pedidos;
  }

  setNome(nome) {
    Produto.validarNome(nome);
    this.nome = nome;
  }

  setImagem(imagem) {
    Produto.validarImagem(imagem);
    this.imagem = imagem;
  }

  setDescricao(descricao) {
    Produto.validarDescricao(descricao);
    this.descricao = descricao;
  }

  setTipo(tipo) {
    Produto.validarTipo(tipo);
    this.tipo = tipo;
  }

  setPrecoBase(precoBase) {
    Produto.validarPrecoBase(precoBase);
    this.precoBase = precoBase;
  }

  setSituacao(situacao) {
    Produto.validarSituacao(situacao);
    this.situacao = situacao;
  }

  adicionarPedidos(pedido) {
    if (pedido instanceof Pedido) {
      this.pedidos.push(pedido);
    } else {
      throw new ModelError("O objeto deve ser uma instância de Pedido");
    }
  }

  static validarNome(nome) {
    if (typeof nome !== "string" || nome.trim().length === 0) {
      throw new ModelError("Nome inválido. O nome não pode ser vazio.");
    }
  }

  static validarImagem(imagem) {
    if (typeof imagem !== "string" || imagem.trim().length === 0) {
      throw new ModelError("Imagem inválida. O campo de imagem não pode ser vazio.");
    }
  }

  static validarDescricao(descricao) {
    if (typeof descricao !== "string" || descricao.trim().length === 0) {
      throw new ModelError("Descrição inválida. A descrição não pode ser vazia.");
    }
  }

  static validarTipo(tipo) {
    const tiposValidos = ["DELIVERY", "BEBIDA", "OUTROS"];
    if (!tiposValidos.includes(tipo)) {
      throw new ModelError("Tipo inválido. O tipo deve ser um dos seguintes: DELIVERY, BEBIDA, OUTROS.");
    }
  }

  static validarPrecoBase(precoBase) {
    if (typeof precoBase !== "number" || precoBase < 0) {
      throw new ModelError("Preço base inválido. O preço base deve ser um número positivo.");
    }
  }

  static validarSituacao(situacao) {
    const situacoesValidas = ["DISPONIVEL", "INDISPONIVEL"];
    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError(
        "Situação inválida. A situação deve ser uma das seguintes: DISPONIVEL, INDISPONIVEL."
      );
    }
  }
}
