"use strict";

import Status from "/model/Status.js";
import Garcom from "/model/Garcom.js";
import GarcomDTO from "/model/GarcomDTO.js";
import DaoGarcom from "/model/dao/DaoGarcom.js";
import ViewerGarcom from "/viewer/ViewerGarcom.js";

export default class CtrlManterGarcons {

  #daoGarcom;
  #viewer;
  #posAtual;
  #status;

  constructor() {
    this.#daoGarcom = new DaoGarcom();
    this.#viewer = new ViewerGarcom(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  async #atualizarContextoNavegacao() {
    this.#status = Status.NAVEGANDO;
    this.#viewer.statusApresentacao();
    let conjGarcons = await this.#daoGarcom.obterGarcons();
    if (conjGarcons.length === 0) {
      this.#posAtual = 0;
      this.#viewer.apresentar(0, 0, null);
    } else {
      if (this.#posAtual === 0 || this.#posAtual > conjGarcons.length)
        this.#posAtual = 1;
      this.#viewer.apresentar(this.#posAtual, conjGarcons.length, new GarcomDTO(conjGarcons[this.#posAtual - 1]));
    }
  }

  async apresentarPrimeiro() {
    let conjGarcons = await this.#daoGarcom.obterGarcons();
    if (conjGarcons.length > 0) this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
  }

  async apresentarProximo() {
    let conjGarcons = await this.#daoGarcom.obterGarcons();
    if (this.#posAtual < conjGarcons.length) this.#posAtual++;
    this.#atualizarContextoNavegacao();
  }

  async apresentarAnterior() {
    let conjGarcons = await this.#daoGarcom.obterGarcons();
    if (this.#posAtual > 1) this.#posAtual--;
    this.#atualizarContextoNavegacao();
  }

  async apresentarUltimo() {
    let conjGarcons = await this.#daoGarcom.obterGarcons();
    this.#posAtual = conjGarcons.length;
    this.#atualizarContextoNavegacao();
  }

  iniciarIncluir() {
    this.#status = Status.INCLUINDO;
    this.#viewer.statusEdicao(Status.INCLUINDO);
    this.efetivar = this.incluir;
  }

  iniciarAlterar() {
    this.#status = Status.ALTERANDO;
    this.#viewer.statusEdicao(Status.ALTERANDO);
    this.efetivar = this.alterar;
  }

  iniciarExcluir() {
    this.#status = Status.EXCLUINDO;
    this.#viewer.statusEdicao(Status.EXCLUINDO);
    this.efetivar = this.excluir;
  }

  async incluir(matricula, nome, email, horaInicio, horaFim, situacao) {
    if (this.#status === Status.INCLUINDO) {
      try {
        let garcom = new Garcom(nome, email, parseInt(matricula), horaInicio, horaFim, situacao);
        await this.#daoGarcom.incluir(garcom);
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      } catch (e) {
        alert(e);
      }
    }
  }

  async alterar(matricula, nome, email, horaInicio, horaFim, situacao) {
    if (this.#status === Status.ALTERANDO) {
      try {
        let garcom = new Garcom(nome, email, parseInt(matricula), horaInicio, horaFim, situacao);
        await this.#daoGarcom.alterar(garcom);
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      } catch (e) {
        alert(e);
      }
    }
  }

  async excluir(matricula) {
    if (this.#status === Status.EXCLUINDO) {
      try {
        let garcom = new Garcom("", "", parseInt(matricula), "00:00", "00:00", "INATIVO");
        await this.#daoGarcom.excluir(garcom);
        this.#status = Status.NAVEGANDO;
        this.#atualizarContextoNavegacao();
      } catch (e) {
        alert(e);
      }
    }
  }

  cancelar() {
    this.#atualizarContextoNavegacao();
  }

  sair() {
    window.location.href = "/menu.html"; // <- aqui ajusta o caminho para o seu Menu
  }

  getStatus() {
    return this.#status;
  }
}
