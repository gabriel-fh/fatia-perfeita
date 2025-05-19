import { Endereco } from "./Endereco";
import ModelError from "./ModelError";
import Produto from "./Produto";
import ProdutoPedido from "./ProdutoPedido";
import Usuario from "./Usuario";

export type SituacaoPedido = "NOVO" | "EM_PREPARO" | "EM_ENTREGA" | "ENTREGUE" | "CANCELADO";
export type MetodoPagamento = "CARTAO_CREDITO" | "DINHEIRO" | "PIX";

export class Pedido {
  private data!: Date;
  private subtotal!: number;
  private taxa_servico!: number;
  private total!: number;
  private situacao!: SituacaoPedido;
  private metodo_pagamento!: MetodoPagamento;
  private produtos!: ProdutoPedido[];
  private user!: Usuario;
  private endereco!: Endereco;

  constructor(
    subtotal: number,
    taxa_servico: number,
    total: number,
    situacao: SituacaoPedido,
    metodo_pagamento: MetodoPagamento,
    user: Usuario,
    endereco: Endereco
  ) {
    this.setData(new Date());
    this.setSubtotal(subtotal);
    this.setTaxaServico(taxa_servico);
    this.setTotal(total);
    this.setSituacao(situacao);
    this.setMetodoPagamento(metodo_pagamento);
    this.setUser(user);
    this.setEndereco(endereco);
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

  getProdutos(): ProdutoPedido[] {
    return this.produtos;
  }

  getUser(): Usuario {
    return this.user;
  }

  getEndereco(): Endereco {
    return this.endereco;
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

  setUser(user: Usuario): void {
    if (!(user instanceof Usuario)) {
      throw new ModelError("User deve ser um Usuario válido.");
    }
    this.user = user;
  }

  setEndereco(endereco: Endereco): void {
    if (!(endereco instanceof Endereco)) {
      throw new ModelError("Endereco deve ser um Endereco válido.");
    }
    this.endereco = endereco;
  }

  setProdutos(produtos: ProdutoPedido[]): void {
    if (!Array.isArray(produtos)) {
      throw new ModelError("Produtos deve ser um array de Produto.");
    }
    produtos.forEach((produto) => {
      if (!(produto instanceof Produto)) {
        throw new ModelError("Produto inválido.");
      }
    });
    this.produtos = produtos;
  }

  adicionarProduto(produto: ProdutoPedido): void {
    if (!(produto instanceof ProdutoPedido)) {
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
