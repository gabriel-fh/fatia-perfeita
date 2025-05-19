import { Endereco } from "./Endereco";
import { MetodoPagamento, SituacaoPedido } from "./Pedido";
import ProdutoPedido from "./ProdutoPedido";
import Usuario from "./Usuario";

export class PedidoDTO {
    private data!: Date;
    private subtotal!: number;
    private taxa_servico!: number;
    private total!: number;
    private situacao!: SituacaoPedido;
    private metodo_pagamento!: MetodoPagamento;
    private produtos!: ProdutoPedido[];
    private user!: Usuario;
    private endereco!: Endereco;
    private id!: string;

    constructor(
        subtotal: number,
        taxa_servico: number,
        total: number,
        situacao: SituacaoPedido,
        metodo_pagamento: MetodoPagamento,
        user: Usuario,
        endereco: Endereco,
        produtos: ProdutoPedido[],
        data: Date,
        id: string
    ) {
        this.data = data
        this.subtotal = subtotal;
        this.taxa_servico = taxa_servico;
        this.total = total;
        this.situacao = situacao;
        this.metodo_pagamento = metodo_pagamento;
        this.user = user;
        this.endereco = endereco;
        this.produtos = produtos;
        this.id = id;
    }

    getId(): string {
        return this.id;
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

    setSituacao(situacao: SituacaoPedido) {
        this.situacao = situacao;
    }
}