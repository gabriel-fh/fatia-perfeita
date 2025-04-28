"use strict";

import Produto from "/model/Produto.js"; // Um model Produto
import ProdutoDTO from "/model/ProdutoDTO.js"; // Um DTO se precisar
import DaoProduto from "/model/dao/DaoProduto.js"; // DAO para produtos
import ViewerProduto from "/viewer/ViewerProduto.js"; // Viewer que mostra na tela

export default class CtrlManterProdutos {
  #daoProduto;
  #viewer;
  #status;
  #posAtual;

  constructor() {
    this.#daoProduto = new DaoProduto();
    this.#viewer = new ViewerProduto(this);
    this.#posAtual = 1;
    this.#atualizarContextoNavegacao();
    // this.#viewer.carregarProdutos();
  }

  // async apresentarProdutos() {
  //   let produtos = await this.#daoProduto.obterProdutos();
  //   console.log(produtos);

  //   this.#viewer.carregarProdutos(produtos);
  // }

  async #atualizarContextoNavegacao() {
    this.#status = "NAVEGANDO";
    // this.#viewer.statusApresentacao();

    let produtos = await this.#daoProduto.obterProdutos();
    

    if (produtos.length > 0) {
      this.#viewer.carregarProdutos(produtos);
    }
  }

  iniciarIncluir() {
    this.#status = "INCLUINDO";
    this.#viewer.statusEdicao("INCLUINDO");
    this.efetivar = this.incluir;
  }

  iniciarAlterar() {
    this.#status = "ALTERANDO";
    this.#viewer.statusEdicao("ALTERANDO");
    this.efetivar = this.alterar;
  }

  iniciarExcluir() {
    this.#status = "EXCLUINDO";
    this.#viewer.statusEdicao("EXCLUINDO");
    this.efetivar = this.excluir;
  }

  async incluir(nome, preco, imagemURL) {
    if (this.#status === "INCLUINDO") {
      try {
        let produto = new Produto(nome, preco, imagemURL);
        await this.#daoProduto.incluir(produto);
        this.#status = "NAVEGANDO";
        this.#atualizarContextoNavegacao();
      } catch (e) {
        alert(e);
      }
    }
  }

  async alterar(id, nome, preco, imagemURL) {
    if (this.#status === "ALTERANDO") {
      try {
        let produto = await this.#daoProduto.obterProdutoPeloId(id);
        if (!produto) {
          alert(`Produto com ID ${id} não encontrado.`);
        } else {
          produto.setNome(nome);
          produto.setPreco(preco);
          produto.setImagemURL(imagemURL);
          await this.#daoProduto.alterar(produto);
        }
        this.#status = "NAVEGANDO";
        this.#atualizarContextoNavegacao();
      } catch (e) {
        alert(e);
      }
    }
  }

  async excluir(id) {
    if (this.#status === "EXCLUINDO") {
      try {
        let produto = await this.#daoProduto.obterProdutoPeloId(id);
        if (!produto) {
          alert(`Produto com ID ${id} não encontrado.`);
        } else {
          await this.#daoProduto.excluir(produto);
        }
        this.#status = "NAVEGANDO";
        this.#atualizarContextoNavegacao();
      } catch (e) {
        alert(e);
      }
    }
  }

  cancelar() {
    this.#atualizarContextoNavegacao();
  }

  getStatus() {
    return this.#status;
  }
}
