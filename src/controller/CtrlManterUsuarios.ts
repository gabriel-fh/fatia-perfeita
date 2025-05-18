import DaoUsuario from "../model/dao/DaoUsuario";
import ViewerPerfil from "../viewer/ViewerPerfil";
import ViewerUsuario from "../viewer/ViewerUsuario";

export default class CtrlManterUsuarios {
  viewer: ViewerUsuario | ViewerPerfil;
  #dao = new DaoUsuario();

  constructor(viewer: ViewerUsuario | ViewerPerfil) {
    this.viewer = viewer;
  }

  async carregarUsuario(uid: string) {
    const usuario = await this.#dao.obterUsuarioPeloUID(uid);

    return usuario;
  }

  async criarConta(email: string, senha: string, nome: string, telefone: string, funcao: string, cpf: string) {
    const refUsuario = await this.#dao.criarConta(email, senha, nome, telefone, funcao, cpf);

    return refUsuario;
  }

  // async excluir(usuario: Usuario) {
  //   const refUsuario = await this.#dao.excluir(usuario);

  //   return refUsuario;
  // }
}
