import ModelError from "./ModelError";

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
    Endereco.isNull(rua, "Rua");
    this.rua = rua;
  }

  setBairro(bairro: string) {
    Endereco.isNull(bairro, "Bairro");
    this.bairro = bairro;
  }

  setNumero(numero: string) {
    Endereco.isNull(numero, "Número");
    this.numero = numero;
  }

  setComplemento(complemento: string) {
    Endereco.isNull(complemento, "Complemento");
    this.complemento = complemento;
  }

  setCidade(cidade: string) {
    Endereco.isNull(cidade, "Cidade");
    this.cidade = cidade;
  }

  setCep(cep: string) {
    Endereco.isNull(cep, "CEP");
    this.cep = cep;
  }

  static isNull(value: string, name: string): void {
    if (value === null || value === undefined || value.trim() === "") {
      throw new ModelError(`${name} não pode ser nulo ou vazio`);
    }
  }
}
