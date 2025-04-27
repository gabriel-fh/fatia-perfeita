import ModelError from "./ModelError.js";
import Comanda from "./Comanda.js";

export default class Mesa extends Usuario {
  constructor(numero, situacao) {
    super("Mesa", `mesafatiaperfeita${numero}@email.com`, "MESA");
    this.setNumero(numero);
    this.setSituacao(situacao);
    this.comandas = [];
  }

  getNumero() {
    return this.numero;
  }

  getSituacao() {
    return this.situacao;
  }

  getComandas() {
    return this.comandas;
  }

  setNumero(numero) {
    Mesa.validarNumero(numero);
    this.numero = numero;
  }

  setSituacao(situacao) {
    Mesa.validarSituacao(situacao);
    this.situacao = situacao;
  }

  adicionarComanda(comanda) {
    if (comanda instanceof Comanda) {
      this.comandas.push(comanda);
    } else {
      throw new ModelError("O objeto deve ser uma instância de Comanda");
    }
  }

  static validarNumero(numero) {
    if (typeof numero !== "number" || !isFinite(taxaServico) || taxaServico < 0) {
      throw new ModelError("O número da mesa deve ser um número positivo válido.");
    }
  }

  static validarSituacao(situacao) {
    const situacoesValidas = ["OCUPADA", "LIVRE", "DESATIVADA"];

    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError("Situação inválida. As opções válidas são: OCUPADA, LIVRE ou DESATIVADA.");
    }
  }
}
