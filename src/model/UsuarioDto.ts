import { Endereco } from "./Endereco";
import Usuario, { FuncaoUsuario } from "./Usuario";

export default class UsuarioDto {
  private uid: string;
  private nome: string;
  private email: string;
  private funcao: FuncaoUsuario;
  private telefone: string;
  private cpf: string;
  private enderecos: Endereco[];

  constructor(usuario: Usuario) {
    this.uid = usuario.getUid();
    this.nome = usuario.getNome();
    this.email = usuario.getEmail();
    this.funcao = usuario.getFuncao();
    this.telefone = usuario.getTelefone();
    this.cpf = usuario.getCpf();
    this.enderecos = usuario.getEnderecos();
  }

  getUid(): string {
    return this.uid;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getFuncao(): FuncaoUsuario {
    return this.funcao;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getCpf(): string {
    return this.cpf;
  }

  getEnderecos(): Endereco[] {
    return this.enderecos;
  }
}
