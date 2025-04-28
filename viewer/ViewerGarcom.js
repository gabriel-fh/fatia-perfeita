import Status from "/model/Status.js";
import ViewerError from "/viewer/ViewerError.js";

export default class ViewerGarcom {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    this.matricula = this.obterElemento("tfMatricula");
    this.nome = this.obterElemento("tfNome");
    this.email = this.obterElemento("tfEmail");
    this.horaInicio = this.obterElemento("tfHoraInicio");
    this.horaFim = this.obterElemento("tfHoraFim");
    this.situacao = this.obterElemento("cbSituacao");

    this.btnSalvar = this.obterElemento("btnSalvar");
    this.btnEdit = this.obterElemento("btnEdit");
    this.btnDelete = this.obterElemento("btnDelete");
  }

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if (elemento == null) throw new ViewerError("Não foi encontrado um elemento com id '" + idElemento + "'");
    elemento.viewer = this;
    return elemento;
  }
}

  
