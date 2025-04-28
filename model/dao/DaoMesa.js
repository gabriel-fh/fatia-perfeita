"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Mesa from "/model/Mesa.js";
import ModelError from "/model/ModelError.js";

export default class DaoMesa {

  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoMesa.promessaConexao == null) {
      DaoMesa.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoMesa.promessaConexao;
  }

  async obterMesas() {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let conjMesas = [];
      let dbRefMesas = ref(connectionDB, "mesas");
      let consulta = query(dbRefMesas, orderByChild("numero"));
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          let mesa = new Mesa(
            elem.numero,
            elem.situacao
          );
          conjMesas.push(mesa);
        });
        resolve(conjMesas);
      }).catch(e => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(mesa) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefMesa = ref(connectionDB, `mesas/${mesa.getNumero()}`);
      set(dbRefMesa, {
        numero: mesa.getNumero(),
        situacao: mesa.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async alterar(mesa) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefMesa = ref(connectionDB, `mesas/${mesa.getNumero()}`);
      set(dbRefMesa, {
        numero: mesa.getNumero(),
        situacao: mesa.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async excluir(mesa) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefMesa = ref(connectionDB, `mesas/${mesa.getNumero()}`);
      remove(dbRefMesa)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
