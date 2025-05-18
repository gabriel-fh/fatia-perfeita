import CtrlManterUsuarios from "../controller/CtrlManterUsuarios";
import { Endereco } from "../model/Endereco";
import { FuncaoUsuario } from "../model/Usuario";

export default class ViewerUsuario {
  #ctrl: CtrlManterUsuarios;

  constructor() {
    this.#ctrl = new CtrlManterUsuarios(this);
  }

  async carregarUsuario(uid: string) {
    const data = await this.#ctrl.carregarUsuario(uid);
    return data;
  }

  async criarConta(email: string, senha: string, nome: string, telefone: string, funcao: FuncaoUsuario, cpf: string) {
    return this.#ctrl.criarConta(email, senha, nome, telefone, funcao, cpf);
  }

  async vincularEndereco(endereco: Endereco) {
    return this.#ctrl.vincularEndereco(endereco);
  }

  async obterUmEnderecoDoUsuario(uid: string) {
    const endereco = await this.#ctrl.obterUmEnderecoDoUsuario(uid);
    return endereco;
  }
}
