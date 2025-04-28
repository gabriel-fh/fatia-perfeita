"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Pedido from "/model/Pedido.js";
import ModelError from "/model/ModelError.js";
import DaoComanda from "./DaoGarcom";

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


          conjPedidos.push(
            new Pedido(
              pedidoSnap.codigo,
              pedidoSnap.dataHora,
              pedidoSnap.situacao,
              comanda
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

          resolve(
            new Pedido(
              pedidoSnap.codigo,
              pedidoSnap.dataHora,
              pedidoSnap.situacao,
              comanda
            )
          );
        }
        else
          resolve(null);
      });
    });
  }

  async incluir(pedido) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefPedidos = ref(connectionDB, 'pedidos');
      runTransaction(dbRefPedidos, async (pedidos) => {
        let dbRefNovaPedido;
        pedido.comanda = pedido.comanda.getCodigo();
        let setPromise = set(dbRefNovaPedido, pedido);
        setPromise.then(value => { resolve(true) }, erro => { reject(erro) });
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
