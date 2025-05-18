import { Endereco } from "./Endereco";
import Usuario from "./Usuario";

export class EnderecoDTO {
  private rua!: string;
  private bairro!: string;
  private numero!: string;
  private complemento!: string;
  private cidade!: string;
  private cep!: string;
  private id!: number;
  private userUid!: string;

  constructor(endereco: Endereco, id: number, usuario: Usuario) {
    this.rua = endereco.getRua();
    this.bairro = endereco.getBairro();
    this.numero = endereco.getNumero();
    this.complemento = endereco.getComplemento();
    this.cidade = endereco.getCidade();
    this.cep = endereco.getCep();
    this.userUid = usuario.getUid();
    this.id = id;
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

  getUserUid(): string {
    return this.userUid;
  }

  getId(): number {
    return this.id;
  }
}
