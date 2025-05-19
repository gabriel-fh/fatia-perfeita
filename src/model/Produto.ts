import ModelError from "./ModelError";

export type TipoProduto = "PIZZA" | "BEBIDA" | "SOBREMESA";
export type SituacaoProduto = "DISPONIVEL" | "INDISPONIVEL";

export default class Produto {
  private codigo!: string;
  private nome!: string;
  private imagem!: string;
  private descricao!: string;
  private tipo!: TipoProduto;
  private preco_base!: number;
  private situacao!: SituacaoProduto;

  constructor(
    codigo: string,
    nome: string,
    imagem: string,
    descricao: string,
    tipo: TipoProduto,
    preco_base: number,
    situacao: SituacaoProduto
  ) {
    this.setCodigo(codigo);
    this.setNome(nome);
    this.setImagem(imagem);
    this.setDescricao(descricao);
    this.setTipo(tipo);
    this.setPrecoBase(preco_base);
    this.setSituacao(situacao);
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

  getTipo(): TipoProduto {
    return this.tipo;
  }

  getPrecoBase(): number {
    return this.preco_base;
  }

  getSituacao(): SituacaoProduto {
    return this.situacao;
  }

  setCodigo(codigo: string): void {
    Produto.validarCodigo(codigo);
    this.codigo = codigo;
  }

  setNome(nome: string): void {
    Produto.validarNome(nome);
    this.nome = nome;
  }

  setImagem(imagem: string): void {
    Produto.validarImagem(imagem);
    this.imagem = imagem;
  }

  setDescricao(descricao: string): void {
    Produto.validarDescricao(descricao);
    this.descricao = descricao;
  }

  setTipo(tipo: TipoProduto): void {
    Produto.validarTipo(tipo);
    this.tipo = tipo;
  }

  setPrecoBase(preco_base: number): void {
    Produto.validarPrecoBase(preco_base);
    this.preco_base = preco_base;
  }

  setSituacao(situacao: SituacaoProduto): void {
    Produto.validarSituacao(situacao);
    this.situacao = situacao;
  }

  static validarCodigo(codigo: string): void {
    if (typeof codigo !== "string" || codigo.trim().length === 0) {
      throw new ModelError("Código inválido. O código não pode ser vazio.");
    }
  }

  static validarNome(nome: string): void {
    if (typeof nome !== "string" || nome.trim().length === 0) {
      throw new ModelError("Nome inválido. O nome não pode ser vazio.");
    }
  }

  static validarImagem(imagem: string): void {
    if (typeof imagem !== "string" || imagem.trim().length === 0) {
      throw new ModelError("Imagem inválida. O campo de imagem não pode ser vazio.");
    }
  }

  static validarDescricao(descricao: string): void {
    if (typeof descricao !== "string" || descricao.trim().length === 0) {
      throw new ModelError("Descrição inválida. A descrição não pode ser vazia.");
    }
  }

  static validarTipo(tipo: string): void {
    const tiposValidos: TipoProduto[] = ["PIZZA", "BEBIDA", "SOBREMESA"];
    if (!tiposValidos.includes(tipo as TipoProduto)) {
      throw new ModelError("Tipo inválido. O tipo deve ser um dos seguintes: PIZZA, BEBIDA, SOBREMESA.");
    }
  }

  static validarPrecoBase(preco_base: number): void {
    if (typeof preco_base !== "number" || preco_base < 0) {
      throw new ModelError("Preço base inválido. O preço base deve ser um número positivo.");
    }
  }

  static validarSituacao(situacao: string): void {
    const situacoesValidas: SituacaoProduto[] = ["DISPONIVEL", "INDISPONIVEL"];
    if (!situacoesValidas.includes(situacao as SituacaoProduto)) {
      throw new ModelError("Situação inválida. A situação deve ser uma das seguintes: DISPONIVEL, INDISPONIVEL.");
    }
  }
}
