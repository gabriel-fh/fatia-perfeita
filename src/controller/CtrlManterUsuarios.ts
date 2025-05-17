import DaoUsuario from "../model/dao/DaoUsuario";
import Usuario from "../model/Usuario";
import ViewerUsuario from "../viewer/ViewerUsuario";

export default class CtrlManterUsuarios {
  viewer: ViewerUsuario;
  #dao = new DaoUsuario();

  constructor(viewer: ViewerUsuario) {
    this.viewer = viewer;
  }

  async carregar() {
    const usuarios = await this.#dao.obterUsuarios();

    return usuarios;
  }

  async criarConta(email: string, senha: string) {
    const refUsuario = await this.#dao.criarConta(email, senha);

    return refUsuario;
  }

  async incluir(usuario: Usuario) {
    const refUsuario = await this.#dao.incluir(usuario);

    return refUsuario;
  }

  async excluir(usuario: Usuario) {
    const refUsuario = await this.#dao.excluir(usuario);

    return refUsuario;
  }
}
