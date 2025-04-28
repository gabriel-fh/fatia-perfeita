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
      let dbRefUsuarios = ref(connectionDB, 'usuarios');
      let paramConsulta = orderByChild('email');
      let consulta = query(dbRefUsuarios, paramConsulta);
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          if (elem.funcao === "MESA") {
            conjMesas.push(new Mesa(elem.uid, elem.numero, elem.situacao));
          }
        });
        resolve(conjMesas);
      }).catch((e) => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async obterMesaPeloId(id) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefMesa = ref(connectionDB, 'usuarios/' + id);
      let consulta = query(dbRefMesa);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        let mesaSnap = dataSnapshot.val();
        if (mesaSnap != null) {
          resolve(
            new Mesa(
              mesaSnap.uid,
              mesaSnap.numero,
              mesaSnap.situacao,
            )
          );
        }
        else
          resolve(null);
      });
    });
  }


  async incluir(mesa) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefMesas = ref(connectionDB, "usuarios");
      runTransaction(dbRefMesas, (mesas) => {
        let dbRefNovoMesa = child(dbRefMesas, mesa.getUid());
        let setPromise = set(dbRefNovoMesa, mesa);
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


  async alterar(mesa) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefMesas = ref(connectionDB, 'mesas');
      runTransaction(dbRefMesas, (mesas) => {
        let dbRefMesaAlterado = child(dbRefMesas, mesa.getSigla());
        let setPromise = set(dbRefMesaAlterado, mesa);
        setPromise
          .then(value => { resolve(true) })
          .catch((e) => { console.log("#ERRO: " + e); resolve(false); });
      });
    });
  }

  async excluir(mesa) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefUsuario = ref(connectionDB, `usuarios/${mesa.getUid()}`);
      remove(dbRefUsuario)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async excluir(mesa) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefMesas = ref(connectionDB, 'usuarios');
      runTransaction(dbRefMesas, (mesas) => {
        let dbRefExcluirMesa = child(dbRefMesas, mesa.getUid());
        let setPromise = remove(dbRefExcluirMesa, mesas);
        setPromise
          .then(value => { resolve(true) })
          .catch((e) => { console.log("#ERRO: " + e); resolve(false); });
      });
    });
  }
}
