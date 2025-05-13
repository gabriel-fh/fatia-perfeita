import Produto from "../model/Produto";
import ViewerProduto from "../viewer/ViewerProduto";
import DaoProduto from "../model/dao/DaoProduto";

export default class CtrlManterProdutos {
  viewer: ViewerProduto;
  #dao = new DaoProduto()

  constructor(viewer: ViewerProduto) {
    this.viewer = viewer;
  }

  async carregar() {
    const produtos = await this.#dao.obterProdutos();

    return produtos;
  }

  async incluir(produto: Produto) {
    const refProduto = await this.#dao.incluir(produto);

    return refProduto;
  }

  async alterar(produto: Produto) {
    const refProduto = await this.#dao.alterar(produto);

    return refProduto;
  }

  async excluir(codigo: string) {
    const refProduto = await this.#dao.excluir(codigo);

    return refProduto;
  }

}
