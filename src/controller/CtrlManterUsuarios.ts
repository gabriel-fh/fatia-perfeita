import DaoEndereco from "../model/dao/DaoEndereco";
import DaoUsuario from "../model/dao/DaoUsuario";
import { Endereco } from "../model/Endereco";
import { FuncaoUsuario } from "../model/Usuario";
import ViewerUsuario from "../viewer/ViewerUsuario";

export default class CtrlManterUsuarios {
  viewer: ViewerUsuario;
  #dao = new DaoUsuario();
  #daoEndereco = new DaoEndereco();

  constructor(viewer: ViewerUsuario) {
    this.viewer = viewer;
  }

  async carregarUsuario(uid: string) {
    const usuario = await this.#dao.obterUsuarioPeloUID(uid);

    return usuario;
  }

  async criarConta(email: string, senha: string, nome: string, telefone: string, funcao: FuncaoUsuario, cpf: string) {
    const refUsuario = await this.#dao.criarConta(email, senha, nome, telefone, funcao, cpf);

    return refUsuario;
  }

  async vincularEndereco(endereco: Endereco) {
    const refEndereco = await this.#daoEndereco.incluir(endereco);
    return refEndereco;
  }

  async obterUmEnderecoDoUsuario(uid: string) {
    const enderecos = await this.#daoEndereco.obterEnderecosDoUsuario(uid);
    return enderecos[0];
  }

  // async excluir(usuario: Usuario) {
  //   const refUsuario = await this.#dao.excluir(usuario);

  //   return refUsuario;
  // }
}
