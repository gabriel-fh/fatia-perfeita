import CtrlManterEnderecos from "../controller/CtrlManterEnderecos";
import { Endereco } from "../model/Endereco";

export default class ViewerEndereco {
  #ctrl: CtrlManterEnderecos;

  constructor() {
    this.#ctrl = new CtrlManterEnderecos(this);
  }
 
  async carregarEnderecos(uid: string) {
    const data = await this.#ctrl.carregar(uid);
    return data;
  }

  async incluirEndereco(endereco: Endereco) {
    const data = await this.#ctrl.incluir(endereco);
    return data;
  }
}
