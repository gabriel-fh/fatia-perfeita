import DaoEndereco from "../model/dao/DaoEndereco";
import { Endereco } from "../model/Endereco";

export default class CtrlManterEnderecos {
  #dao = new DaoEndereco();


  async carregarEnderecos(uid: string) {
    const enderecos = await this.#dao.obterEnderecosDoUsuario(uid);
    return enderecos;
  }

  async incluirEndereco(endereco: Endereco) {
    const refEndereco = await this.#dao.incluir(endereco);
    return refEndereco;
  }
}
