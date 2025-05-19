import ModelError from "./ModelError";
import Produto, { SituacaoProduto, TipoProduto } from "./Produto";

export default class ProdutoPedido extends Produto {
  private quantidade!: number;

  constructor(
    codigo: string,
    nome: string,
    imagem: string,
    descricao: string,
    tipo: TipoProduto,
    preco_base: number,
    situacao: SituacaoProduto,
    quantidade: number = 1
  ) {
    super(codigo, nome, imagem, descricao, tipo, preco_base, situacao);

    this.setQuantidade(quantidade);
  }


  getQuantidade(): number {
    return this.quantidade;
  }


  setQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ModelError("Quantidade deve ser maior que zero");
    }
    this.quantidade = quantidade;
  }

  adicionarQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ModelError("Quantidade deve ser maior que zero");
    }
    this.quantidade += quantidade;
  }

  removerQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      throw new ModelError("Quantidade deve ser maior que zero");
    }
    if (this.quantidade - quantidade < 0) {
      throw new ModelError("Quantidade não pode ser negativa");
    }
    this.quantidade -= quantidade;
  }

  static isNull(value: string, name: string): void {
    if (value === null || value === undefined || value.trim() === "") {
      throw new ModelError(`${name} não pode ser nulo ou vazio`);
    }
  }
}
