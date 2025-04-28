"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Comanda from "/model/Comanda.js";
import ModelError from "/model/ModelError.js";

export default class DaoComanda {

  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoComanda.promessaConexao == null) {
      DaoComanda.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoComanda.promessaConexao;
  }

  async obterComandas() {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let conjComandas = [];
      let dbRefComandas = ref(connectionDB, "comandas");
      let consulta = query(dbRefComandas, orderByChild("codigo"));
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          let comanda = new Comanda(
            elem.codigo,
            elem.subtotal,
            elem.total,
            elem.taxa_servico,
            elem.situacao,
            elem.data_hora
          );
          conjComandas.push(comanda);
        });
        resolve(conjComandas);
      }).catch(e => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(comanda) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefComanda = ref(connectionDB, `comandas/${comanda.getCodigo()}`);
      set(dbRefComanda, {
        codigo: comanda.getCodigo(),
        subtotal: comanda.getSubtotal(),
        total: comanda.getTotal(),
        taxa_servico: comanda.getTaxaServico(),
        situacao: comanda.getSituacao(),
        data_hora: comanda.getDataHora()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async alterar(comanda) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefComanda = ref(connectionDB, `comandas/${comanda.getCodigo()}`);
      set(dbRefComanda, {
        codigo: comanda.getCodigo(),
        subtotal: comanda.getSubtotal(),
        total: comanda.getTotal(),
        taxa_servico: comanda.getTaxaServico(),
        situacao: comanda.getSituacao(),
        data_hora: comanda.getDataHora()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async excluir(comanda) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefComanda = ref(connectionDB, `comandas/${comanda.getCodigo()}`);
      remove(dbRefComanda)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
