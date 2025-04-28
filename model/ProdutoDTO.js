// ProdutoDTO.js
export default class ProdutoDTO {
  constructor(produto) {
    this.codigo = produto.getCodigo();
    this.nome = produto.getNome();
    this.imagem = produto.getImagem();
    this.descricao = produto.getDescricao();
    this.tipo = produto.getTipo();
    this.preco_base = produto.getPrecoBase();
    this.situacao = produto.getSituacao();
  }

  getCodigo() {
    return this.codigo;
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
    return this.preco_base;
  }

  getSituacao() {
    return this.situacao;
  }
}
