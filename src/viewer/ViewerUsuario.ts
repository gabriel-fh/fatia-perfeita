import CtrlManterUsuarios from "../controller/CtrlManterUsuarios";
import Usuario from "../model/Usuario";

export default class ViewerUsuario {
  #ctrl: CtrlManterUsuarios;

  constructor() {
    this.#ctrl = new CtrlManterUsuarios(this);
  }

  async criarConta(email: string, senha: string) {
    return this.#ctrl.criarConta(email, senha);
  }

  async incluirUsuario(usuario: Usuario) {
    return this.#ctrl.incluir(usuario);
  }
}
