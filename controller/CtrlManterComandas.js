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

  async incluir(codigo, nome, imagem, descricao, tipo, preco_base, situacao) {
    try {
      let comanda = new Comanda(codigo, nome, imagem, descricao, tipo, Number(preco_base), situacao);
      await this.#daoComanda.incluir(comanda);
      this.#atualizarContextoNavegacao();
    } catch (e) {
      console.log(e);

      alert(e);
    }
  }

  async alterar(codigo, nome, imagem, descricao, tipo, preco_base, situacao) {
    try {
      let comanda = await this.#daoComanda.obterComandaPeloId(codigo);
      if (!comanda) {
        alert(`Comanda com codigo ${codigo} não encontrado.`);
      } else {
        comanda.setNome(nome);
        comanda.setPreco(preco);
        comanda.setImagem(imagem);
        comanda.setDescricao(descricao);
        comanda.setTipo(tipo);
        comanda.setPrecoBase(Number(preco_base));
        comanda.setSituacao(situacao);
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
