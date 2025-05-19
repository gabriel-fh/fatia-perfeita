import DaoEndereco from "../model/dao/DaoEndereco";
import { Endereco } from "../model/Endereco";
import ViewerEndereco from "../viewer/ViewerEndereco";

export default class CtrlManterEnderecos {
  viewer: ViewerEndereco;
  #dao = new DaoEndereco();

  constructor(viewer: ViewerEndereco) {
    this.viewer = viewer;
  }

  async carregar(uid: string) {
    const enderecos = await this.#dao.obterEnderecosDoUsuario(uid);
    return enderecos;
  }

  async incluir(endereco: Endereco) {
    const refEndereco = await this.#dao.incluir(endereco);
    return refEndereco;
  }
}
