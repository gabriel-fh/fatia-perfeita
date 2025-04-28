"use strict";

import Mesa from "/model/Mesa.js"; 
import daoMesa from "/model/dao/daoMesa.js"; 
import ViewerMesa from "/viewer/ViewerMesa.js"; // Viewer que mostra na tela

export default class CtrlManterMesas {
  #daoMesa;
  #viewer;

  constructor() {
    this.#daoMesa = new daoMesa();
    this.#viewer = new ViewerMesa(this);
    this.#atualizarContextoNavegacao();
  }

  async #atualizarContextoNavegacao() {
    let mesas = await this.#daoMesa.obterMesas();

    this.#viewer.carregarMesas(mesas);
  }

  async incluir(id, numero, situacao) {
    try {
      let mesa = new Mesa(id, numero, situacao);
      await this.#daoMesa.incluir(mesa);
      this.#atualizarContextoNavegacao();
    } catch (e) {
      console.log(e);
      
      alert(e);
    }
  }

  async alterar(id, numero, situacao) {
    try {
      let mesa = await this.#daoMesa.obterMesaPeloId(id);
      if (!mesa) {
        alert(`Mesa com codigo ${codigo} não encontrado.`);
      } else {
        mesa.setNumero(numero);
        mesa.setSituacao(situacao);
        await this.#daoMesa.alterar(mesa);
      }
      this.#atualizarContextoNavegacao();
    } catch (e) {
      alert(e);
    }
  }

  async excluir(id) {
    try {
      let mesa = await this.#daoMesa.obterMesaPeloId(id);
      if (!mesa) {
        alert(`Mesa com codigo ${codigo} não encontrado.`);
      } else {
        await this.#daoMesa.excluir(mesa);
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
