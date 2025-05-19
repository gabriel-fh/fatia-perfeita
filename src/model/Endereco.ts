import ModelError from "./ModelError";

export class Endereco {
  private rua!: string;
  private bairro!: string;
  private numero!: string;
  private complemento!: string;
  private cidade!: string;
  private cep!: string;
  private userUid?: string;
  private id?: string;

  constructor(rua: string, numero: string, bairro: string, complemento: string, cidade: string, cep: string) {
    this.setRua(rua);
    this.setNumero(numero);
    this.setBairro(bairro);
    this.setComplemento(complemento);
    this.setCidade(cidade);
    this.setCep(cep);
    this.userUid = undefined;
    this.id = undefined;
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

  getId(): string | undefined {
    return this.id;
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

  setId(id: string) {
    this.id = id;
  }

  static isNull(value: string, name: string): void {
    if (value === null || value === undefined || value.trim() === "") {
      throw new ModelError(`${name} não pode ser nulo ou vazio`);
    }
  }
}
