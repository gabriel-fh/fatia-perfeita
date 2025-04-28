"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Pedido from "/model/Pedido.js";
import ModelError from "/model/ModelError.js";
import DaoComanda from "./DaoGarcom.js";

export default class DaoPedido {

  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoPedido.promessaConexao == null) {
      DaoPedido.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoPedido.promessaConexao;
  }

  async obterPedidos() {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let conjPedidos = [];
      let dbRefPedidos = ref(connectionDB, 'pedidos');
      let consulta = query(dbRefPedidos);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let pedidoSnap = dataSnapshotObj.val();
          let daoComanda = new DaoComanda();
          let comanda = daoComanda.obterComandaPeloCodigo(pedidoSnap.comanda);
          let produtos = this.obterProdutosDoPedido(codigo);


          conjPedidos.push(
            new Pedido(
              pedidoSnap.codigo,
              pedidoSnap.dataHora,
              pedidoSnap.situacao,
              comanda,
              produtos
            )
          );
        });
        resolve(conjPedidos);
      }).catch((e) => { console.log("#ERRO: " + e); resolve([]) });
    });
  }

  async obterPedidoPeloCodigo(codigo) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefPedidos = ref(connectionDB, 'pedidos');
      let paramConsulta = orderByChild('codigo').equalTo(codigo);
      let consulta = query(dbRefPedidos, paramConsulta);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        let pedidoSnap = dataSnapshot.val();
        if (pedidoSnap != null) {
          let daoComanda = new DaoComanda();
          let comanda = daoComanda.obterComandaPeloCodigo(pedidoSnap.comanda);
          let produtos = this.obterProdutosDoPedido(codigo);

          resolve(
            new Pedido(
              pedidoSnap.codigo,
              pedidoSnap.dataHora,
              pedidoSnap.situacao,
              comanda,
              produtos
            )
          );
        }
        else
          resolve(null);
      });
    });
  }

  async obterProdutosDoPedido(codigoPedido) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefProdutosPedidos = ref(connectionDB, 'produtos_pedidos');
      let consulta = query(dbRefProdutosPedidos, orderByChild('pedido'), equalTo(codigoPedido));
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        let produtosPedido = [];

        if (dataSnapshot.exists()) {
          dataSnapshot.forEach(snapshot => {
            let produtoPedidoSnap = snapshot.val();

            // Instancia corretamente ProdutoPedido
            let produtoPedido = new ProdutoPedido(
              produtoPedidoSnap.pedido,
              produtoPedidoSnap.produto,
              produtoPedidoSnap.quantidade,
              produtoPedidoSnap.preco
            );

            produtosPedido.push(produtoPedido);
          });
        }

        resolve(produtosPedido);
      }).catch((erro) => {
        console.log("#ERRO ao obter produtos do pedido: " + erro);
        reject([]);
      });
    });
  }


  async incluir(pedido) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefPedidos = ref(connectionDB, 'pedidos');

      runTransaction(dbRefPedidos, async (pedidos) => {
        try {
          let dbRefNovaPedido = push(dbRefPedidos);

          let pedidoParaSalvar = {
            ...pedido,
            comanda: pedido.comanda.getCodigo ? pedido.comanda.getCodigo() : pedido.comanda,
            produtos: undefined
          };

          await set(dbRefNovaPedido, pedidoParaSalvar);

          let dbRefProdutosPedidos = ref(connectionDB, 'produtos_pedidos');
          for (let produto of pedido.getProdutos()) {
            let produtoPedido = {
              pedido: produto.getPedido(),
              produto: produto.getCodigo(),
              quantidade: produto.quantidade || 1,
              preco: produto.preco || 0
            };

            let dbRefNovoProdutoPedido = push(dbRefProdutosPedidos);
            await set(dbRefNovoProdutoPedido, produtoPedido);
          }

          resolve(true);

        } catch (erro) {
          reject(erro);
        }
      });
    });
    return resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async alterar(pedido) {
    let connectionDB = await this.obterConexao();
    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let dbRefPedidos = ref(connectionDB, 'pedidos');
      runTransaction(dbRefPedidos, (pedidos) => {
        let dbRefAlterarPedido = child(dbRefPedidos, pedido.getCodigo());

        pedido.comanda = pedido.comanda.getCodigo();

        let setPromise = set(dbRefAlterarPedido, pedido);
        setPromise.then(value => { resolve(true) }, erro => { reject(erro) });
      });
    });
    return resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async excluir(pedido) {
    let connectionDB = await this.obterConexao();
    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let dbRefPedido = ref(connectionDB, 'pedidos');
      runTransaction(dbRefPedido, (pedidos) => {
        let dbRefExcluirPedido = child(dbRefPedido, pedido.getCodigo());
        let setPromise = remove(dbRefExcluirPedido, pedido);
        setPromise.then(value => { resolve(true) }, erro => { reject(erro) });
      });
    });
    return resultado;
  }
}
