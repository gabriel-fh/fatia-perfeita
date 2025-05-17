import Usuario from "./Usuario";

export default class UsuarioDto {
  private uid: string;
  private nome: string;
  private email: string;
  private funcao: string;
  private telefone: string;
  private cpf: string;

  constructor(usuario: Usuario) {
    this.uid = usuario.getUid();
    this.nome = usuario.getNome();
    this.email = usuario.getEmail();
    this.funcao = usuario.getFuncao();
    this.telefone = usuario.getTelefone();
    this.cpf = usuario.getCpf();
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

  getFuncao(): string {
    return this.funcao;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getCpf(): string {
    return this.cpf;
  }

}
