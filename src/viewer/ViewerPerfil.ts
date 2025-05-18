import CtrlManterUsuarios from "../controller/CtrlManterUsuarios";

export default class ViewerPerfil {
  #ctrl: CtrlManterUsuarios;

  constructor() {
    this.#ctrl = new CtrlManterUsuarios(this);
  }

  async carregarUsuario(email: string) {
    const data = await this.#ctrl.carregarUsuario(email);

    return data;
  }

  async criarConta(email: string, senha: string, nome: string, telefone: string, funcao: string, cpf: string) {
    return this.#ctrl.criarConta(email, senha, nome, telefone, funcao, cpf);
  }

}
