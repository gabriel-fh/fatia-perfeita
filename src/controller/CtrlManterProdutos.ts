import Produto from "../model/Produto";
import DaoProduto from "../model/dao/DaoProduto";

export default class CtrlManterProdutos {
  #dao = new DaoProduto()

  async carregarProdutos() {
    const produtos = await this.#dao.obterProdutos();

    return produtos;
  }

  async incluirProduto(produto: Produto) {
    const refProduto = await this.#dao.incluir(produto);

    return refProduto;
  }

  async alterarProduto(produto: Produto) {
    const refProduto = await this.#dao.alterar(produto);

    return refProduto;
  }

  async excluirProduto(codigo: string) {
    const refProduto = await this.#dao.excluir(codigo);

    return refProduto;
  }

}
