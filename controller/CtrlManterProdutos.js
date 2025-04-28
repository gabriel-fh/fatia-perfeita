"use strict";

import Produto from "/model/Produto.js"; // Um model Produto
import ProdutoDTO from "/model/ProdutoDTO.js"; // Um DTO se precisar
import DaoProduto from "/model/dao/DaoProduto.js"; // DAO para produtos
import ViewerProduto from "/viewer/ViewerProduto.js"; // Viewer que mostra na tela

export default class CtrlManterProdutos {
  #daoProduto;
  #viewer;

  constructor() {
    this.#daoProduto = new DaoProduto();
    this.#viewer = new ViewerProduto(this);
    this.#atualizarContextoNavegacao();
  }

  async #atualizarContextoNavegacao() {
    let produtos = await this.#daoProduto.obterProdutos();

    this.#viewer.carregarProdutos(produtos);
  }

  async incluir(codigo, nome, imagem, descricao, tipo, preco_base, situacao) {
    try {
      let produto = new Produto(codigo, nome, imagem, descricao, tipo, Number(preco_base), situacao);
      await this.#daoProduto.incluir(produto);
      this.#atualizarContextoNavegacao();
    } catch (e) {
      console.log(e);

      alert(e);
    }
  }

  async alterar(codigo, nome, imagem, descricao, tipo, preco_base, situacao) {
    try {
      let produto = await this.#daoProduto.obterProdutoPeloId(codigo);
      if (!produto) {
        alert(`Produto com codigo ${codigo} não encontrado.`);
      } else {
        produto.setNome(nome);
        produto.setPreco(preco);
        produto.setImagem(imagem);
        produto.setDescricao(descricao);
        produto.setTipo(tipo);
        produto.setPrecoBase(Number(preco_base));
        produto.setSituacao(situacao);
        await this.#daoProduto.alterar(produto);
      }
      this.#atualizarContextoNavegacao();
    } catch (e) {
      alert(e);
    }
  }

  async excluir(codigo) {
    try {
      let produto = await this.#daoProduto.obterProdutoPeloCodigo(codigo);
      if (!produto) {
        alert(`Produto com codigo ${codigo} não encontrado.`);
      } else {
        await this.#daoProduto.excluir(produto);
      }
      this.#atualizarContextoNavegacao();
    } catch (e) {
      alert(e);
    }
  }

  cancelar() {
    this.#atualizarContextoNavegacao();
  }
}
