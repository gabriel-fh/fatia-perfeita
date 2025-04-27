import Status from "/model/Status.js";
import ViewerError from "/viewer/ViewerError.js";

export default class ViewerProduto {

  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    this.divNavegar = this.obterElemento('divNavegar');
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

    this.tfCodigo = this.obterElemento('tfCodigo');
    this.tfNome = this.obterElemento('tfNome');
    this.tfImagem = this.obterElemento('tfImagem');
    this.tfDescricao = this.obterElemento('tfDescricao');
    this.tfTipo = this.obterElemento('tfTipo');
    this.tfPrecoBase = this.obterElemento('tfPrecoBase');
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

  async apresentar(pos, qtde, produto) {
    this.configurarNavegacao(pos <= 1, pos === qtde);

    if (produto == null) {
      this.tfCodigo.value = "";
      this.tfNome.value = "";
      this.tfImagem.value = "";
      this.tfDescricao.value = "";
      this.tfTipo.value = "ALIMENTO";
      this.tfPrecoBase.value = "";
      this.cbSituacao.value = "DISPONIVEL";
      this.divAviso.innerHTML = "Número de Produtos: 0";
    } else {
      this.tfCodigo.value = produto.getCodigo();
      this.tfNome.value = produto.getNome();
      this.tfImagem.value = produto.getImagem();
      this.tfDescricao.value = produto.getDescricao();
      this.tfTipo.value = produto.getTipo();
      this.tfPrecoBase.value = produto.getPrecoBase();
      this.cbSituacao.value = produto.getSituacao();
      this.divAviso.innerHTML = `Posição: ${pos} | Número de Produtos: ${qtde}`;
    }
  }

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled = flagFim;
    this.btProximo.disabled = flagFim;
    this.btAnterior.disabled = flagInicio;
  }

  statusEdicao(operacao) {
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false;

    if (operacao !== Status.EXCLUINDO) {
      this.tfCodigo.disabled = operacao !== Status.INCLUINDO ? true : false;
      this.tfNome.disabled = false;
      this.tfImagem.disabled = false;
      this.tfDescricao.disabled = false;
      this.tfTipo.disabled = false;
      this.tfPrecoBase.disabled = false;
      this.cbSituacao.disabled = false;
      this.divAviso.innerHTML = "";
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";
    }

    if (operacao === Status.INCLUINDO) {
      this.tfCodigo.value = "";
      this.tfNome.value = "";
      this.tfImagem.value = "";
      this.tfDescricao.value = "";
      this.tfTipo.value = "ALIMENTO";
      this.tfPrecoBase.value = "";
      this.cbSituacao.value = "DISPONIVEL";
    }
  }

  statusApresentacao() {
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true;
    this.tfCodigo.disabled = true;
    this.tfNome.disabled = true;
    this.tfImagem.disabled = true;
    this.tfDescricao.disabled = true;
    this.tfTipo.disabled = true;
    this.tfPrecoBase.disabled = true;
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
  const codigo = this.viewer.tfCodigo.value;
  const nome = this.viewer.tfNome.value;
  const imagem = this.viewer.tfImagem.value;
  const descricao = this.viewer.tfDescricao.value;
  const tipo = this.viewer.tfTipo.value;
  const precoBase = this.viewer.tfPrecoBase.value;
  const situacao = this.viewer.cbSituacao.value;

  this.viewer.getCtrl().efetivar(codigo, nome, imagem, descricao, tipo, precoBase, situacao);
}
function fnBtCancelar() { this.viewer.getCtrl().cancelar(); }
