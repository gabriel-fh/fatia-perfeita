"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Produto from "/model/Produto.js";
import ModelError from "/model/ModelError.js";

export default class DaoProduto {

  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoProduto.promessaConexao == null) {
      DaoProduto.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoProduto.promessaConexao;
  }

  async obterProdutos() {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let conjProdutos = [];
      let dbRefProdutos = ref(connectionDB, "produtos");
      let consulta = query(dbRefProdutos, orderByChild("codigo"));
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          let produto = new Produto(
            elem.codigo,
            elem.nome,
            elem.imagem,
            elem.descricao,
            elem.tipo,
            elem.preco_base,
            elem.situacao
          );
          conjProdutos.push(produto);
        });
        resolve(conjProdutos);
      }).catch(e => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(produto) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefProduto = ref(connectionDB, `produtos/${produto.getCodigo()}`);
      set(dbRefProduto, {
        codigo: produto.getCodigo(),
        nome: produto.getNome(),
        imagem: produto.getImagem(),
        descricao: produto.getDescricao(),
        tipo: produto.getTipo(),
        preco_base: produto.getPrecoBase(),
        situacao: produto.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async alterar(produto) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefProduto = ref(connectionDB, `produtos/${produto.getCodigo()}`);
      set(dbRefProduto, {
        codigo: produto.getCodigo(),
        nome: produto.getNome(),
        imagem: produto.getImagem(),
        descricao: produto.getDescricao(),
        tipo: produto.getTipo(),
        preco_base: produto.getPrecoBase(),
        situacao: produto.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async excluir(produto) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefProduto = ref(connectionDB, `produtos/${produto.getCodigo()}`);
      remove(dbRefProduto)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
