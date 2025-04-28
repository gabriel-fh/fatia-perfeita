"use strict";

import Mesa from "/model/Mesa.js";
import DaoMesa from "/model/dao/DaoMesa.js";
import ViewerMesa from "/viewer/ViewerMesa.js"; // Viewer que mostra na tela
import { criarUsuario } from "/util/CriarUsuario.js"; // Função para criar usuário

export default class CtrlManterMesas {
  #daoMesa;
  #viewer;

  constructor() {
    this.#daoMesa = new DaoMesa();
    this.#viewer = new ViewerMesa(this);
    this.#atualizarContextoNavegacao();
  }

  async #atualizarContextoNavegacao() {
    let mesas = await this.#daoMesa.obterMesas();

    this.#viewer.carregarMesas(mesas);
  }

  async incluir(numero, situacao) {
    try {
      const user = await criarUsuario(`mesafatiaperfeita${numero}@email.com`, "123456");
      let mesa = new Mesa(user.uid, numero, situacao);
      await this.#daoMesa.incluir(mesa);
      this.#atualizarContextoNavegacao();
    } catch (e) {
      console.log(e);

      alert(e);
    }
  }

  async alterar(uid, numero, situacao) {
    try {
      let mesa = await this.#daoMesa.obterMesaPeloId(uid);
      if (!mesa) {
        alert(`Mesa com uid ${uid} não encontrado.`);
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

  async excluir(uid) {
    try {
      let mesa = await this.#daoMesa.obterMesaPeloId(uid);
      if (!mesa) {
        alert(`Mesa com uid ${uid} não encontrado.`);
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
