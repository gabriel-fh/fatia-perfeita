"use strict";

import DaoGarcom from "../model/dao/DaoGarcom.js";
import ViewerGarcom from "../viewer/ViewerGarcom.js";
import Garcom from "../model/Garcom.js";
import { criarUsuario } from "../util/CriarUsuario.js";
import Usuario from "../model/Usuario.js";

export default class CtrlManterGarcons {
  #daoGarcom;
  #viewer;

  constructor() {
    this.#daoGarcom = new DaoGarcom();
    this.#viewer = new ViewerGarcom(this);
    this.#atualizarContextoNavegacao();
  }

  async #atualizarContextoNavegacao() {
    let garcons = await this.#daoGarcom.obterGarcons();

    this.#viewer.carregarGarcons(garcons);
  }

  async incluir(nome, email, senha, situacao) {
    try {
      Usuario.validarEmail(email);
      Usuario.validarSenha(senha);
      const user = await criarUsuario(email, senha);
      let garcom = new Garcom(user.uid, nome, email, situacao);
      await this.#daoGarcom.incluir(garcom);
      this.#atualizarContextoNavegacao();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  async alterar(uid, nome, email, situacao) {
    try {
      const garcom = new Garcom(uid, nome, email, situacao);
      let res = await this.#daoGarcom.alterar(garcom);
      if (res === false) {
        alert("Erro ao alterar o garçom.");
      } else {
        alert("Garçom alterado com sucesso.");
      }
      this.#atualizarContextoNavegacao();
    } catch (e) {
      alert(`Erro ao alterar o garçom: ${e}`);
    }
  }

  async excluir(uid, nome, email, situacao) {
    try {
      const garcom = new Garcom(uid, nome, email, situacao);
      let res = await this.#daoGarcom.excluir(garcom);
      if (res === false) {
        alert("Erro ao excluir o garçom.");
      } else {
        alert("Garçom excluído com sucesso.");
      }
      this.#atualizarContextoNavegacao();
    } catch (e) {
      alert(`Erro ao excluir o garçom: ${e}`);
    }
  }

  cancelar() {
    this.#atualizarContextoNavegacao();
  }
}
