import Status from "/model/Status.js";
import ViewerError from "/viewer/ViewerError.js";

export default class ViewerGarcom {

  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    this.divComandos = this.obterElemento('divComandos');
    this.divAviso = this.obterElemento('divAviso');
    this.divDialogo = this.obterElemento('divDialogo');

    this.btPrimeiro = this.obterElemento('btPrimeiro');
    this.btAnterior = this.obterElemento('btAnterior');
    this.btProximo = this.obterElemento('btProximo');
    this.btUltimo = this.obterElemento('btUltimo');

    this.btIncluir = this.obterElemento('btIncluir');
    this.btAlterar = this.obterElemento('btAlterar');
    this.btExcluir = this.obterElemento('btExcluir');
    this.btSair = this.obterElemento('btSair');

    this.btOk = this.obterElemento('btOk');
    this.btCancelar = this.obterElemento('btCancelar');

    this.tfMatricula = this.obterElemento('tfMatricula');
    this.tfNome = this.obterElemento('tfNome');
    this.tfEmail = this.obterElemento('tfEmail');
    this.tfHoraInicio = this.obterElemento('tfHoraInicio');
    this.tfHoraFim = this.obterElemento('tfHoraFim');
    this.cbSituacao = this.obterElemento('cbSituacao');

    this.btPrimeiro.onclick = fnBtPrimeiro;
    this.btProximo.onclick = fnBtProximo;
    this.btAnterior.onclick = fnBtAnterior;
    this.btUltimo.onclick = fnBtUltimo;

    this.btIncluir.onclick = fnBtIncluir;
    this.btAlterar.onclick = fnBtAlterar;
    this.btExcluir.onclick = fnBtExcluir;
    this.btSair.onclick = fnBtSair;

    this.btOk.onclick = fnBtOk;
    this.btCancelar.onclick = fnBtCancelar;
  }

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if (elemento == null)
      throw new ViewerError("Não encontrei o elemento '" + idElemento + "'");
    elemento.viewer = this;
    return elemento;
  }

  getCtrl() {
    return this.#ctrl;
  }

  async apresentar(pos, qtde, garcom) {
    this.configurarNavegacao(pos <= 1, pos === qtde);

    if (garcom == null) {
      this.tfMatricula.value = "";
      this.tfNome.value = "";
      this.tfEmail.value = "";
      this.tfHoraInicio.value = "";
      this.tfHoraFim.value = "";
      this.cbSituacao.value = "ATIVO";
      this.divAviso.innerHTML = "Número de Garçons: 0";
    } else {
      this.tfMatricula.value = garcom.getMatricula();
      this.tfNome.value = garcom.getNome();
      this.tfEmail.value = garcom.getEmail();
      this.tfHoraInicio.value = garcom.getHoraInicio();
      this.tfHoraFim.value = garcom.getHoraFim();
      this.cbSituacao.value = garcom.getSituacao();
      this.divAviso.innerHTML = `Posição: ${pos} | Número de Garçons: ${qtde}`;
    }
  }

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled = flagFim;
    this.btProximo.disabled = flagFim;
    this.btAnterior.disabled = flagInicio;
  }

  statusEdicao(operacao) {
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false;
  
    if (operacao !== Status.EXCLUINDO) {
      this.tfMatricula.disabled = operacao !== Status.INCLUINDO ? true : false;
      this.tfNome.disabled = false;
      this.tfEmail.disabled = false;
      this.tfHoraInicio.disabled = false;
      this.tfHoraFim.disabled = false;
      this.cbSituacao.disabled = false;
      this.divAviso.innerHTML = "";
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";
    }
  
    if (operacao === Status.INCLUINDO) {
      this.tfMatricula.value = "";
      this.tfNome.value = "";
      this.tfEmail.value = "";
      this.tfHoraInicio.value = "";
      this.tfHoraFim.value = "";
      this.cbSituacao.value = "ATIVO";
    }
  }
  

  statusApresentacao() {
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true;
    this.tfMatricula.disabled = true;
    this.tfNome.disabled = true;
    this.tfEmail.disabled = true;
    this.tfHoraInicio.disabled = true;
    this.tfHoraFim.disabled = true;
    this.cbSituacao.disabled = true;
  }
}

// Funções de Botão
function fnBtPrimeiro() { this.viewer.getCtrl().apresentarPrimeiro(); }
function fnBtProximo() { this.viewer.getCtrl().apresentarProximo(); }
function fnBtAnterior() { this.viewer.getCtrl().apresentarAnterior(); }
function fnBtUltimo() { this.viewer.getCtrl().apresentarUltimo(); }
function fnBtIncluir() { this.viewer.getCtrl().iniciarIncluir(); }
function fnBtAlterar() { this.viewer.getCtrl().iniciarAlterar(); }
function fnBtExcluir() { this.viewer.getCtrl().iniciarExcluir(); }
function fnBtSair() { this.viewer.getCtrl().sair(); }
function fnBtOk() {
  const matricula = this.viewer.tfMatricula.value;
  const nome = this.viewer.tfNome.value;
  const email = this.viewer.tfEmail.value;
  const horaInicio = this.viewer.tfHoraInicio.value;
  const horaFim = this.viewer.tfHoraFim.value;
  const situacao = this.viewer.cbSituacao.value;

  this.viewer.getCtrl().efetivar(matricula, nome, email, horaInicio, horaFim, situacao);
}
function fnBtCancelar() { this.viewer.getCtrl().cancelar(); }
