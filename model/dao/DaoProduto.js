"use strict";

import {
  getDatabase,
  ref,
  query,
  child,
  orderByChild,
  get,
  set,
  remove,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

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

      resultPromise
        .then((dataSnapshot) => {
          console.log(dataSnapshot);
          dataSnapshot.forEach((dataSnapshotObj) => {
            let elem = dataSnapshotObj.val();
            let produto = new Produto(
              elem.codigo, // codigo
              elem.nome, // nome
              elem.imagem, // imagem
              elem.descricao, // descricao
              elem.tipo, // tipo
              elem.preco_base, // preco_base
              elem.situacao // situacao
            );
            conjProdutos.push(produto);
          });
          resolve(conjProdutos);
        })
        .catch((e) => {
          console.error("#ERRO: " + e);
          resolve([]);
        });
    });
  }

  async incluir(produto) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefProdutos = ref(connectionDB, "produtos");
      runTransaction(dbRefProdutos, (produtos) => {
        let dbRefNovoProduto = child(dbRefProdutos, produto.getCodigo());
        let setPromise = set(dbRefNovoProduto, produto);
        setPromise
          .then((value) => {
            resolve(true);
          })
          .catch((e) => {
            console.log("#ERRO: " + e);
            resolve(false);
          });
      });
    });
    return resultado;
  }

  async alterar(produto) {
    let connectionDB = await this.obterConexao();    
    return new Promise( (resolve, reject) => {
      let dbRefProdutos = ref(connectionDB,'produtos');
      runTransaction(dbRefProdutos, (produtos) => {  
        let dbRefProdutoAlterado = child(dbRefProdutos,produto.getSigla());
        let setPromise = set(dbRefProdutoAlterado,produto);
        setPromise
          .then( value => {resolve(true)})
          .catch((e) => {console.log("#ERRO: " + e);resolve(false);});
      });
    });
  }

  async excluir(produto) {
    let connectionDB = await this.obterConexao();    
    return new Promise( (resolve, reject) => {
      let dbRefProdutos = ref(connectionDB,'produtos');
      runTransaction(dbRefProdutos, (produtos) => {      
        let dbRefExcluirProduto = child(dbRefProdutos,produto.getCodigo());
        let setPromise = remove(dbRefExcluirProduto,produtos);
        setPromise
          .then( value => {resolve(true)})
          .catch((e) => {console.log("#ERRO: " + e);resolve(false);});
      });
    });
  }
}
