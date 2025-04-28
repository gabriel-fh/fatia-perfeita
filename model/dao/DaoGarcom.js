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

import Garcom from "/model/Garcom.js";
import ModelError from "/model/ModelError.js";

export default class DaoGarcom {

  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoGarcom.promessaConexao == null) {
      DaoGarcom.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoGarcom.promessaConexao;
  }

  async obterGarcons() {
    let connectionDB = await this.obterConexao();

    return new Promise((resolve) => {
      let conjGarcons = [];
      let dbRefUsuarios = ref(connectionDB, 'usuarios');
      let paramConsulta = orderByChild('email');
      let consulta = query(dbRefUsuarios, paramConsulta);
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          if (elem.funcao === "GARCOM") {
            conjGarcons.push(new Garcom(elem.uid, elem.nome, elem.email, elem.situacao));
          }
        });
        resolve(conjGarcons);
      }).catch((e) => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(garcom) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefGarcons = ref(connectionDB, "garcons");
      runTransaction(dbRefGarcons, (produtos) => {
        let dbRefNovoGarcom = child(dbRefGarcons, garcom.getUid());
        let setPromise = set(dbRefNovoGarcom, garcom);
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

  async alterar(garcom) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefUsuario = ref(connectionDB, `usuarios/${garcom.getUid()}`);
      set(dbRefUsuario, {
        uid: garcom.getUid(),
        nome: garcom.getNome(),
        email: garcom.getEmail(),
        funcao: "GARCOM",
        situacao: garcom.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async excluir(garcom) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefUsuario = ref(connectionDB, `usuarios/${garcom.getUid()}`);
      remove(dbRefUsuario)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
