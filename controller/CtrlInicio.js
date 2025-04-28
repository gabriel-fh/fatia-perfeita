import DaoProduto from "../model/dao/DaoProduto.js";
import ViewerInicio from "../viewer/ViewerInicio.js";
import DaoPedido from "../model/dao/DaoPedido.js";
import ModelError from "../model/ModelError.js";
import { Pedido } from "../model/Pedido.js";
import Comanda from "../model/Comanda.js";
import Mesa from "../model/Mesa.js";
import Garcom from "../model/Garcom.js";

export default class CtrlInicio {
  #daoProduto;
  #viewer;
  #carrinho;
  #daoPedido;

  constructor() {
    this.#daoProduto = new DaoProduto();
    this.#daoPedido = new DaoPedido();
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
    const item = this.#carrinho.find((item) => item.codigo === produto.codigo);
    if (item) {
      item.quantidade -= 1;
      if (item.quantidade <= 0) {
        this.#carrinho = this.#carrinho.filter((item) => item.codigo !== produto.codigo);
      }
    }
    localStorage.setItem("carrinho", JSON.stringify(this.#carrinho));
    this.#viewer.carregarCarrinho(this.#carrinho);
  }

  async realizarPedido() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");
    const segundo = String(agora.getSeconds()).padStart(2, "0");

    const dataHoraFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

    try {
      const garcom = new Garcom("");
      const mesa = new Mesa("Mesa 1", "Garçom 1");
      const comanda = new Comanda(`${getCodigoNumerico()}`, 0, 0, "ABERTA", garcom, mesa);
      const pedido = new Pedido(`${getCodigoNumerico()}`, dataHoraFormatada, "EM_PREPARO", comanda, this.#carrinho);
      this.#daoPedido.incluir(pedido);
    } catch (error) {
      alert("Erro ao realizar o pedido: " + error.message);
      throw new ModelError("Erro ao realizar o pedido: " + error.message);
    }
  }

  static getCodigoNumerico() {
    const alfabetico = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numerico = "0123456789";

    let codigo = "";

    for (let i = 0; i < 5; i++) {
      codigo += alfabetico.charAt(Math.floor(Math.random() * alfabetico.length)) + numerico.charAt(Math.floor(Math.random() * numerico.length));
    }

    return codigo;
  }
}
