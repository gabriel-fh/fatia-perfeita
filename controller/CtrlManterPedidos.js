"use strict";

import Pedido from "../model/Pedido.js";
// import PedidoDTO from "../model/PedidoDTO.js";
import DaoPedido from "../model/dao/DaoPedido.js"; 
import ViewerPedido from "../viewer/ViewerPedido.js";

export default class CtrlManterPedidos {
    #daoPedido;
    #viewer;

    constructor() {
        this.#daoPedido = new DaoPedido();
        this.#viewer = new ViewerPedido(this);
        this.#atualizarContextoNavegacao();
    }

    async #atualizarContextoNavegacao() {
        let pedidos = await this.#daoPedido.obterPedidos();

        this.#viewer.carregarPedidos(pedidos);
    }

    async incluir(codigo, dataHora, situacao, comanda, produtos) {
        try {
            let pedido = new Pedido(codigo, dataHora, situacao, comanda, produtos);
            await this.#daoPedido.incluir(pedido);
            this.#atualizarContextoNavegacao();
        } catch (e) {
            console.log(e);

            alert(e);
        }
    }

    async alterar(codigo, dataHora, situacao, comanda) {
        try {
            let pedido = await this.#daoPedido.obterPedidoPeloCodigo(codigo);
            if (!pedido) {
                alert(`Pedido com codigo ${codigo} não encontrado.`);
            } else {
                this.setDataHora(dataHora);
                this.setSituacao(situacao);
                this.setComanda(comanda);
                await this.#daoPedido.alterar(pedido);
            }
            this.#atualizarContextoNavegacao();
        } catch (e) {
            alert(e);
        }
    }

    async excluir(codigo) {
        try {
            let pedido = await this.#daoPedido.obterPedidoPeloCodigo(codigo);
            if (!pedido) {
                alert(`Pedido com codigo ${codigo} não encontrado.`);
            } else {
                await this.#daoPedido.excluir(pedido);
            }
            this.#atualizarContextoNavegacao();
        } catch (e) {
            alert(e);
        }
    }

    cancelar() {
        this.#atualizarContextoNavegacao();
    }
}
