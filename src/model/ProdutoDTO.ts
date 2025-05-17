import Produto, { SituacaoProduto, TipoProduto } from "./Produto"; // Certifique-se de que Produto esteja tipado corretamente

export default class ProdutoDTO {
  private codigo: string;
  private nome: string;
  private imagem: string;
  private descricao: string;
  private tipo: TipoProduto;
  private preco_base: number;
  private situacao: SituacaoProduto;

  constructor(produto: Produto) {
    this.codigo = produto.getCodigo();
    this.nome = produto.getNome();
    this.imagem = produto.getImagem();
    this.descricao = produto.getDescricao();
    this.tipo = produto.getTipo();
    this.preco_base = produto.getPrecoBase();
    this.situacao = produto.getSituacao();
  }

  getCodigo(): string {
    return this.codigo;
  }

  getNome(): string {
    return this.nome;
  }

  getImagem(): string {
    return this.imagem;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getTipo(): "PIZZA" | "BEBIDA" | "SOBREMESA" {
    return this.tipo;
  }

  getPrecoBase(): number {
    return this.preco_base;
  }

  getSituacao(): "DISPONIVEL" | "INDISPONIVEL" {
    return this.situacao;
  }
}
