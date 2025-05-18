import ModelError from "./ModelError";
import Usuario from "./Usuario";

export class Endereco {
  private rua!: string;
  private bairro!: string;
  private numero!: string;
  private complemento!: string;
  private cidade!: string;
  private cep!: string;
  private userUid?: string;

  constructor(rua: string, bairro: string, numero: string, complemento: string, cidade: string, cep: string) {
    this.setRua(rua);
    this.setBairro(bairro);
    this.setNumero(numero);
    this.setComplemento(complemento);
    this.setCidade(cidade);
    this.setCep(cep);
  }

  getRua(): string {
    return this.rua;
  }

  getBairro(): string {
    return this.bairro;
  }

  getNumero(): string {
    return this.numero;
  }

  getComplemento(): string {
    return this.complemento;
  }

  getCidade(): string {
    return this.cidade;
  }

  getCep(): string {
    return this.cep;
  }

  getUserUid(): string | undefined {
    return this.userUid;
  }

  setUserUid(userUid: string) {
    this.userUid = userUid;
  }

  setRua(rua: string) {
    Endereco.validarRua(rua);
    this.rua = rua;
  }

  setBairro(bairro: string) {
    Endereco.validarBairro(bairro);
    this.bairro = bairro;
  }

  setNumero(numero: string) {
    Endereco.validarNumero(numero);
    this.numero = numero;
  }

  setComplemento(complemento: string) {
    Endereco.validarComplemento(complemento);
    this.complemento = complemento;
  }

  setCidade(cidade: string) {
    Endereco.validarCidade(cidade);
    this.cidade = cidade;
  }

  setCep(cep: string) {
    Endereco.validarCep(cep);
    this.cep = cep;
  }

  static validarRua(rua: string) {
    if (rua.length < 3) throw new ModelError("Rua inválida: " + rua);
  }

  static validarBairro(bairro: string) {
    if (bairro.length < 3) throw new ModelError("Bairro inválido: " + bairro);
  }

  static validarNumero(numero: string) {
    if (numero.length < 1) throw new ModelError("Número inválido: " + numero);
  }

  static validarComplemento(complemento: string) {
    if (complemento.length < 3) throw new ModelError("Complemento inválido: " + complemento);
  }

  static validarCidade(cidade: string) {
    if (cidade.length < 3) throw new ModelError("Cidade inválida: " + cidade);
  }

  static validarCep(cep: string) {
    if (cep.length < 8) throw new ModelError("CEP inválido: " + cep);
  }
}