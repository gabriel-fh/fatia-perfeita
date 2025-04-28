import ModelError from "./ModelError.js";
import Comanda from "./Comanda.js";
import Usuario from "./Usuario.js";

export default class Garcom extends Usuario {
  constructor(uid, nome, email, situacao) {
    super(email, nome, uid, "GARCOM");
    this.setUid(uid);
    this.setSituacao(situacao);
    this.comandas = [];
  }

  getUid() {
    return this.uid;
  }

  getSituacao() {
    return this.situacao;
  }

  getComandas() {
    return this.comandas;
  }

  setUid(uid) {
    if (!Usuario.validarUid(uid)) {
      throw new ModelError("UID inválido: " + uid);
    }
    this.uid = uid;
  }

  setSituacao(situacao) {
    Garcom.validarSituacao(situacao);
    this.situacao = situacao;
  }

  adicionarComanda(comanda) {
    if (comanda instanceof Comanda) {
      this.comandas.push(comanda);
    } else {
      throw new ModelError("O objeto deve ser uma instância de Comanda");
    }
  }

  static validarSituacao(situacao) {
    const situacoesValidas = ["ATIVO", "INATIVO", 'ATENDENDO"];'];
    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError("Situação inválida. As situações válidas são: ATIVO, INATIVO e ATENDENDO.");
    }
  }
}
