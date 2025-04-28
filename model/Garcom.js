import ModelError from "./ModelError.js";
import Comanda from "./Comanda.js";
import Usuario from "./Usuario.js";


export default class Garcom extends Usuario {
  constructor(uid, nome, email, situacao) {
    super(email, nome, uid, "GARCOM");
    this.setSituacao(situacao);
    this.comandas = [];
  }


  getSituacao() {
    return this.situacao;
  }

  getComandas() {
    return this.comandas;
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
