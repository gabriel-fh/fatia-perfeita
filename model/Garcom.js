import ModelError from "./ModelError.js";
import Comanda from "./Comanda.js";
import Usuario from "./Usuario.js";


export default class Garcom extends Usuario {
  constructor(nome, email, matricula, horaInicio, horaFim, situacao) {
    super(nome, email, "GARCON");
    this.setMatricula(matricula);
    this.setHoraInicio(horaInicio);
    this.setHoraFim(horaFim);
    this.setSituacao(situacao);
    this.comandas = [];
  }

  getMatricula() {
    return this.matricula;
  }

  getHoraInicio() {
    return this.horaInicio;
  }

  getHoraFim() {
    return this.horaFim;
  }

  getSituacao() {
    return this.situacao;
  }

  getComandas() {
    return this.comandas;
  }

  setMatricula(matricula) {
    Garcom.validarMatricula(matricula);
    this.matricula = matricula;
  }

  setHoraInicio(horaInicio) {
    Garcom.validarHora(horaInicio);
    this.horaInicio = horaInicio;
  }

  setHoraFim(horaFim) {
    Garcom.validarHora(horaFim);
    if (Garcom.compararHoras(horaFim, this.horaInicio) <= 0) {
      throw new ModelError("A hora de fim deve ser posterior à hora de início");
    }
    this.horaFim = horaFim;
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

  static validarMatricula(matricula) {
    if (typeof matricula !== "number" || matricula <= 0) {
      throw new ModelError("Matricula inválida. A matricula deve ser um número válido.");
    }
  }

  static validarHora(hora) {
    const regexHora = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])(:([0-5]?[0-9]))?$/;
    if (!regexHora.test(hora)) {
      throw new ModelError("Hora inválida. O formato da hora deve ser HH:mm ou HH:mm:ss.");
    }
  }

  static compararHoras(hora1, hora2) {
    const [h1, m1, s1] = hora1.split(":").map(Number);
    const [h2, m2, s2] = hora2.split(":").map(Number);
    const t1 = h1 * 3600 + m1 * 60 + (s1 || 0);
    const t2 = h2 * 3600 + m2 * 60 + (s2 || 0);
    return t1 - t2;
  }

  static validarSituacao(situacao) {
    const situacoesValidas = ["ATIVO", "INATIVO", 'ATENDENDO"];'];
    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError("Situação inválida. As situações válidas são: ATIVO, INATIVO e ATENDENDO.");
    }
  }
}
