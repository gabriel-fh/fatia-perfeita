import ModelError from "./ModelError";
import Produto from "./Produto";

export type SituacaoPedido = "NOVO" | "EM_PREPARO" | "EM_ENTREGA" | "ENTREGUE" | "CANCELADO";
export type MetodoPagamento = "CARTAO_CREDITO" | "DINHEIRO" | "PIX";

export class Pedido {
  private data!: Date;
  private subtotal!: number;
  private taxa_servico!: number;
  private total!: number;
  private situacao!: SituacaoPedido;
  private metodo_pagamento!: MetodoPagamento;
  private produtos!: Produto[];
  private userUid!: string;
  private enderecoId!: string;

  constructor(
    subtotal: number,
    taxa_servico: number,
    total: number,
    situacao: SituacaoPedido,
    metodo_pagamento: MetodoPagamento,
    userUid: string,
    enderecoId: string
  ) {
    this.setData(new Date());
    this.setSubtotal(subtotal);
    this.setTaxaServico(taxa_servico);
    this.setTotal(total);
    this.setSituacao(situacao);
    this.setMetodoPagamento(metodo_pagamento);
    this.setUserUid(userUid);
    this.setEndereco(enderecoId);
    this.produtos = [];
  }

  getData(): Date {
    return this.data;
  }

  getSubtotal(): number {
    return this.subtotal;
  }

  getTaxaServico(): number {
    return this.taxa_servico;
  }

  getTotal(): number {
    return this.total;
  }

  getSituacao(): SituacaoPedido {
    return this.situacao;
  }

  getMetodoPagamento(): MetodoPagamento {
    return this.metodo_pagamento;
  }

  getProdutos(): Produto[] {
    return this.produtos;
  }

  getUserUid(): string {
    return this.userUid;
  }

  getEnderecoId(): string {
    return this.enderecoId;
  }

  setData(data: Date): void {
    this.data = data;
  }

  setSubtotal(subtotal: number): void {
    Pedido.validarValor(subtotal);
    this.subtotal = subtotal;
  }

  setTaxaServico(taxa_servico: number): void {
    Pedido.validarValor(taxa_servico);
    this.taxa_servico = taxa_servico;
  }

  setTotal(total: number): void {
    Pedido.validarValor(total);
    this.total = total;
  }

  setSituacao(situacao: SituacaoPedido): void {
    Pedido.validarSituacao(situacao);
    this.situacao = situacao;
  }

  setMetodoPagamento(metodo_pagamento: MetodoPagamento): void {
    Pedido.validarMetodoPagamento(metodo_pagamento);
    this.metodo_pagamento = metodo_pagamento;
  }

  setUserUid(userUid: string): void {
    if (typeof userUid !== 'string' || userUid.trim() === '') {
      throw new ModelError("User UID deve ser uma string não vazia.");
    }
    this.userUid = userUid;
  }

  setEndereco(id: string): void {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new ModelError("ID de endereço deve ser uma string não vazia.");
    }
    this.enderecoId = id;
  }

  adicionarProduto(produto: Produto): void {
    if (!(produto instanceof Produto)) {
      throw new ModelError("Produto inválido.");
    }
    this.produtos.push(produto);
  }

  static validarValor(total: number): void {
    if (typeof total !== 'number' || total < 0) {
      throw new ModelError("Total deve ser um número positivo.");
    }
  }

  static validarSituacao(situacao: SituacaoPedido): void {
    const situacoesValidas: SituacaoPedido[] = [
      "NOVO",
      "EM_PREPARO",
      "EM_ENTREGA",
      "ENTREGUE",
      "CANCELADO",
    ];

    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError("Situação inválida.");
    }
  }

  static validarMetodoPagamento(metodo_pagamento: MetodoPagamento): void {
    const metodosValidos: MetodoPagamento[] = [
      "CARTAO_CREDITO",
      "DINHEIRO",
      "PIX",
    ];

    if (!metodosValidos.includes(metodo_pagamento)) {
      throw new ModelError("Método de pagamento inválido.");
    }
  }
}
