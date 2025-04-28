"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Pedido from "/model/Pedido.js";
import ModelError from "/model/ModelError.js";

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
      let dbRefPedidos = ref(connectionDB, "pedidos");
      let consulta = query(dbRefPedidos, orderByChild("codigo"));
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          let pedido = new Pedido(
            elem.codigo,
            elem.dataHora,
            elem.situacao
          );
          conjPedidos.push(pedido);
        });
        resolve(conjPedidos);
      }).catch(e => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(pedido) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefPedido = ref(connectionDB, `pedidos/${pedido.getCodigo()}`);
      set(dbRefPedido, {
        codigo: pedido.getCodigo(),
        dataHora: pedido.getDataHora(),
        situacao: pedido.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async alterar(pedido) {
    // No Firebase, o `set` sobrescreve se já existir, igual incluir
    return this.incluir(pedido);
  }

  async excluir(pedido) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefPedido = ref(connectionDB, `pedidos/${pedido.getCodigo()}`);
      remove(dbRefPedido)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
