"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import ProdutoPedido from "/model/ProdutoPedido.js";
import ModelError from "/model/ModelError.js";

export default class DaoProdutoPedido {

  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoProdutoPedido.promessaConexao == null) {
      DaoProdutoPedido.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoProdutoPedido.promessaConexao;
  }

  async obterProdutosPedido(codigoPedido) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let conjProdutosPedido = [];
      let dbRefProdutosPedido = ref(connectionDB, `pedidos/${codigoPedido}/produtos`);
      let consulta = query(dbRefProdutosPedido);
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          let produtoPedido = new ProdutoPedido(
            elem.produtoId,
            elem.quantidade,
            elem.preco
          );
          conjProdutosPedido.push(produtoPedido);
        });
        resolve(conjProdutosPedido);
      }).catch(e => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(codigoPedido, produtoPedido) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefProdutoPedido = ref(connectionDB, `pedidos/${codigoPedido}/produtos/${produtoPedido.getProdutoId()}`);
      set(dbRefProdutoPedido, {
        produtoId: produtoPedido.getProdutoId(),
        quantidade: produtoPedido.getQuantidade(),
        preco: produtoPedido.getPreco()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async alterar(codigoPedido, produtoPedido) {
    // Igual incluir: no Firebase o set() sobrescreve se já existir
    return this.incluir(codigoPedido, produtoPedido);
  }

  async excluir(codigoPedido, produtoId) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefProdutoPedido = ref(connectionDB, `pedidos/${codigoPedido}/produtos/${produtoId}`);
      remove(dbRefProdutoPedido)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
