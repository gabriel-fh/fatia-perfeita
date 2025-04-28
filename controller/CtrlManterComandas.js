"use strict";

import Comanda from "/model/Comanda.js"; // Um model Comanda
import ComandaDTO from "/model/ComandaDTO.js"; // Um DTO se precisar
import DaoComanda from "/model/dao/DaoComanda.js"; // DAO para comandas
import ViewerComanda from "/viewer/ViewerComanda.js"; // Viewer que mostra na tela

export default class CtrlManterComandas {
    #daoComanda;
    #viewer;

    constructor() {
        this.#daoComanda = new DaoComanda();
        this.#viewer = new ViewerComanda(this);
        this.#atualizarContextoNavegacao();
    }

    async #atualizarContextoNavegacao() {
        let comandas = await this.#daoComanda.obterComandas();

        this.#viewer.carregarComandas(comandas);
    }

    async incluir(codigo, subtotal, total, taxaServico, situacao, dataHora, mesa, garcom) {
        try {
            let comanda = new Comanda(codigo, subtotal, total, taxaServico, situacao, dataHora, mesa, garcom);
            await this.#daoComanda.incluir(comanda);
            this.#atualizarContextoNavegacao();
        } catch (e) {
            console.log(e);

            alert(e);
        }
    }

    async alterar(codigo, subtotal, total, taxaServico, situacao, dataHora, mesa, garcom) {
        try {
            let comanda = await this.#daoComanda.obterComandaPeloCodigo(codigo);
            if (!comanda) {
                alert(`Comanda com codigo ${codigo} não encontrado.`);
            } else {
                comanda.setSubtotal(subtotal);
                comanda.setTotal(total);
                comanda.setTaxaServico(taxaServico);
                comanda.setSituacao(situacao);
                comanda.setDataHora(dataHora);
                comanda.setMesa(mesa);
                comanda.setGarcom(garcom);
                await this.#daoComanda.alterar(comanda);
            }
            this.#atualizarContextoNavegacao();
        } catch (e) {
            alert(e);
        }
    }

    async excluir(codigo) {
        try {
            let comanda = await this.#daoComanda.obterComandaPeloCodigo(codigo);
            if (!comanda) {
                alert(`Comanda com codigo ${codigo} não encontrado.`);
            } else {
                await this.#daoComanda.excluir(comanda);
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
