import DaoProduto from "../model/dao/DaoProduto.js";
import ViewerInicio from "../viewer/ViewerInicio.js";


export default class CtrlInicio {
  #daoProduto;
  #viewer;

  constructor() {
    this.#daoProduto = new DaoProduto();
    this.#viewer = new ViewerInicio(this);
    this.#atualizarContextoNavegacao();

  }

  async #atualizarContextoNavegacao() {
    let produtos = await this.#daoProduto.obterProdutos();
    console.log(produtos);
    this.#viewer.carregarProdutos(produtos);
  }



}
