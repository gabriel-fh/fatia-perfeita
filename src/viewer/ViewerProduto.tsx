import Produto from "../model/Produto";
import CtrlManterProdutos from "../controller/CtrlManterProdutos";

export default class ViewerProduto {
  #ctrl: CtrlManterProdutos;

  constructor() {
    this.#ctrl = new CtrlManterProdutos(this); // passa a si mesmo como referência
    // this.#ctrl.atualizarProdutos(); // inicia a carga
  }

  async carregarProdutos() {
    const data = await this.#ctrl.carregar();

    return data;
  }

  incluirProduto(produto: Produto) {
    return this.#ctrl.incluir(produto);
  }

  alterarProduto(produto: Produto) {
    return this.#ctrl.alterar(produto);
  }

  excluirProduto(codigo: string) {
    return this.#ctrl.excluir(codigo);
  }

  // recarregar() {
  //   this.#ctrl.atualizarProdutos();
  // }
}
