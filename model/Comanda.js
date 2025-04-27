import ModelError from "./ModelError.js";
import Mesa from "./Mesa.js";
import Garcom from "./Garcom.js";
import Pedido from "./Pedido.js";

export default class Comanda {
  constructor(codigo, subtotal, total, taxaServico, situacao, dataHora, mesa, garcom) {
    this.setCodigo(codigo);
    this.setSubtotal(subtotal);
    this.setTotal(total);
    this.setTaxaServico(taxaServico);
    this.setSituacao(situacao);
    this.setDataHora(dataHora);
    this.setMesa(mesa);
    this.setGarcom(garcom);
    this.pedidos = [];
  }

  getCodigo() {
    return this.codigo;
  }

  getSubtotal() {
    return this.subtotal;
  }

  getTotal() {
    return this.total;
  }

  getTaxaServico() {
    return this.taxaServico;
  }

  getSituacao() {
    return this.situacao;
  }

  getDataHora() {
    return this.dataHora;
  }

  getMesa() {
    return this.mesa;
  }

  getGarcom() {
    return this.garcom;
  }

  getPedidos() {
    return this.pedidos;
  }

  setCodigo(codigo) {
    Comanda.validarCodigo(codigo);
    this.codigo = codigo;
  }

  setSubtotal(subtotal) {
    Comanda.validarSubtotal(subtotal);
    this.subtotal = subtotal;
  }

  setTotal(total) {
    Comanda.validarTotal(total);
    this.total = total;
  }

  setTaxaServico(taxaServico) {
    Comanda.validarTaxaServico(taxaServico);
    this.taxaServico = taxaServico;
  }

  setSituacao(situacao) {
    Comanda.validarSituacao(situacao);
    this.situacao = situacao;
  }

  setDataHora(dataHora) {
    Comanda.validarDataHora(dataHora);
    this.dataHora = dataHora;
  }

  setMesa(mesa) {
    Comanda.validarMesa(mesa);
    this.mesa = mesa;
  }

  setGarcom(garcom) {
    Comanda.validarGarcom(garcom);
    this.garcom = garcom;
  }

  adicionarPedido(pedido) {
    if (pedido instanceof Pedido) {
      this.pedidos.push(pedido);
    } else {
      throw new ModelError("O objeto deve ser uma instância de Pedido");
    }
  }

  static validarCodigo(codigo) {
    if (!codigo || (typeof codigo === "string" && !codigo.trim())) {
      throw new ModelError("Código não pode ser nulo ou vazio.");
    }
  }

  static validarSubtotal(subtotal) {
    if (typeof subtotal !== "number" || !isFinite(subtotal) || subtotal < 0) {
      throw new ModelError("Subtotal deve ser um número positivo.");
    }
  }

  static validarTotal(total) {
    if (typeof total !== "number" || !isFinite(total) || total < 0) {
      throw new ModelError("Total deve ser um número positivo.");
    }
  }

  static validarTaxaServico(taxaServico) {
    if (typeof taxaServico !== "number" || !isFinite(taxaServico) || taxaServico < 0) {
      throw new ModelError("Taxa de serviço deve ser um número positivo.");
    }
  }

  static validarSituacao(situacao) {
    const situacoesValidas = ["ABERTA", "PAGA", "CANCELADA"];

    if (!situacoesValidas.includes(situacao)) {
      throw new ModelError("Situação inválida. As opções válidas são: ABERTA, PAGA ou CANCELADA.");
    }
  }

  static validarDataHora(dataHora) {
    const regexDataHora =
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})\s(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])(:([0-5]?[0-9]))?$/;

    if (!regexDataHora.test(dataHora)) {
      throw new ModelError("Data e hora inválidas. O formato deve ser 'dd/mm/aaaa HH:mm' ou 'dd/mm/aaaa HH:mm:ss'.");
    }
  }

  static validarMesa(mesa) {
    if (!(mesa instanceof Mesa)) {
      throw new ModelError("A comanda deve estar associada a uma mesa");
    }
  }

  static validarGarcom(garcom) {
    if (!(garcom instanceof Garcom)) {
      throw new ModelError("A comanda deve estar associada a um garçom");
    }
  }
}
