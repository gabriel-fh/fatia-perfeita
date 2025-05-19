import { Endereco } from "./Endereco";
import ModelError from "./ModelError";
import { Pedido } from "./Pedido";

export type FuncaoUsuario = "ADMIN" | "CLIENTE";

export default class Usuario {
  private uid!: string;
  private nome!: string;
  private email!: string;
  private funcao!: FuncaoUsuario;
  private telefone!: string;
  private cpf!: string;
  private enderecos!: Endereco[];
  private pedidos!: Pedido[];

  constructor(uid: string, nome: string, email: string, telefone: string, funcao: FuncaoUsuario, cpf: string) {
    this.setUid(uid);
    this.setNome(nome);
    this.setEmail(email);
    this.setFuncao(funcao);
    this.setTelefone(telefone);
    this.setCpf(cpf);
    this.enderecos = [];
    this.pedidos = [];
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
    return Usuario.formatarTelefone(this.telefone);
  }

  getCpf(): string {
    return this.cpf;
  }

  getEnderecos(): Endereco[] {
    return this.enderecos;
  }

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  setUid(uid: string) {
    if (!Usuario.validarUid(uid)) throw new ModelError("UID inválido: " + uid);
    this.uid = uid;
  }

  setNome(nome: string) {
    Usuario.validarNome(nome);
    this.nome = nome;
  }

  setEmail(email: string) {
    Usuario.validarEmail(email);
    this.email = email;
  }

  setFuncao(funcao: FuncaoUsuario) {
    Usuario.validarFuncao(funcao);
    this.funcao = funcao;
  }

  setTelefone(telefone: string) {
    Usuario.validarTelefone(telefone);
    this.telefone = telefone;
  }

  setCpf(cpf: string) {
    Usuario.validarCpf(cpf);
    this.cpf = cpf;
  }

  adicionarEndereco(endereco: Endereco) {
    if (!(endereco instanceof Endereco)) {
      throw new ModelError("Endereço inválido.");
    }
    endereco.setUserUid(this.uid);
    this.enderecos.push(endereco);
  }

  adicionarPedido(pedido: Pedido) {
    if (!(pedido instanceof Pedido)) {
      throw new ModelError("Pedido inválido.");
    }
    pedido.setUserUid(this.uid);
    this.pedidos.push(pedido);
  }

  static validarSenha(senha: string) {
    if (typeof senha !== "string" || senha.length < 6) {
      throw new ModelError("A senha deve ter pelo menos 6 caracteres.");
    }
  }

  static validarNome(nome: string) {
    if (typeof nome !== "string" || nome.trim() === "" || nome.length < 3) {
      throw new ModelError("O nome deve ser uma string não vazia com no mínimo 3 caracteres.");
    }
  }

  static validarTelefone(telefone: string) {
    const regex = /^\d{10,11}$/;
    if (typeof telefone !== "string" || !regex.test(telefone)) {
      throw new ModelError("O telefone deve conter apenas números e ter 10 ou 11 dígitos.");
    }
  }

  static validarUid(uid: string) {
    if (typeof uid !== "string" || uid.trim() === "") {
      throw new ModelError("O UID deve ser uma string não vazia.");
    }
    return true;
  }

  static validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !regex.test(email)) {
      throw new ModelError("Digite um e-mail válido.");
    }
  }

  static validarFuncao(funcao: FuncaoUsuario) {
    const funcoesValidas = ["ADMIN", "CLIENTE"];
    if (typeof funcao !== "string" || !funcoesValidas.includes(funcao)) {
      throw new ModelError("Função inválida. As opções válidas são: ADMIN OU CLIENTE");
    }
  }

  static validarCpf(cpf: string) {
    const regex = /^\d{11}$/;
    if (typeof cpf !== "string" || !regex.test(cpf)) {
      throw new ModelError("O CPF deve conter apenas números e ter 11 dígitos.");
    }
  }

  static formatarTelefone(telefone: string) {
    if (telefone.length === 11) {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    }
    return telefone;
  }
}
