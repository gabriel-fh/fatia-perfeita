import DaoProduto from "../model/dao/DaoProduto.js";
import ViewerInicio from "../viewer/ViewerInicio.js";

export default class CtrlInicio {
  #daoProduto;
  #viewer;
  #carrinho;

  constructor() {
    this.#daoProduto = new DaoProduto();
    this.#viewer = new ViewerInicio(this);
    this.#carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    this.#atualizarContextoNavegacao();
  }

  async #atualizarContextoNavegacao() {
    let produtos = await this.#daoProduto.obterProdutos();
    this.#viewer.carregarProdutos(produtos);
    this.#viewer.carregarCarrinho(this.#carrinho);
    this.#viewer.toggleCarrinho();
  }

  adicionarAoCarrinho(produto) {

    const itemExistente = this.#carrinho.find((item) => item.codigo === produto.codigo);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.#carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(this.#carrinho));

    this.#viewer.carregarCarrinho(this.#carrinho);
  }

  removerItemDoCarrinho(produto) {
    const item = this.#carrinho.find(item => item.codigo === produto.codigo);
    if (item) {
      item.quantidade -= 1;
      if (item.quantidade <= 0) {
        this.#carrinho = this.#carrinho.filter(item => item.codigo !== produto.codigo);
      }
    }
    localStorage.setItem("carrinho", JSON.stringify(this.#carrinho));
    this.#viewer.carregarCarrinho(this.#carrinho);
  }
}
