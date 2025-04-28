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
import ModelError from "../ModelError.js";

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
      let dbRefUsuarios = ref(connectionDB, "usuarios");
      let paramConsulta = orderByChild("email");
      let consulta = query(dbRefUsuarios, paramConsulta);
      let resultPromise = get(consulta);

      resultPromise
        .then((dataSnapshot) => {
          dataSnapshot.forEach((dataSnapshotObj) => {
            let elem = dataSnapshotObj.val();
            if (elem.funcao === "GARCOM") {
              conjGarcons.push(new Garcom(dataSnapshotObj.key, elem.nome, elem.email, elem.situacao));
            }
          });
          resolve(conjGarcons);
        })
        .catch((e) => {
          console.error("#ERRO: " + e);
          resolve([]);
        });
    });
  }

  async obterGarcomPeloId(uid) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefGarcom = ref(connectionDB, "usuarios/" + uid);
      let consulta = query(dbRefGarcom);
      let resultPromise = get(consulta);
      resultPromise
        .then((dataSnapshot) => {
          const garcomSnap = dataSnapshot.val();
          
          if (garcomSnap && garcomSnap.funcao === "GARCOM") {
            resolve(new Garcom(uid, garcomSnap.nome, garcomSnap.email, garcomSnap.situacao));
          } else {
            resolve(null);
          }
        })
        .catch((e) => {
          console.error("Erro ao buscar garçom:", e);
          reject(e);
        });
    });
  }

  async incluir(garcom) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefGarcons = ref(connectionDB, "usuarios");
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
            throw new ModelError("Erro ao incluir o garçom: " + e);
          });
      });
    });
    return resultado;
  }

  async alterar(email, dados) {
    let connectionDB = await this.obterConexao();
    const uid = await this.getUid(email);
    return new Promise((resolve, reject) => {
      const dbRefUsuario = ref(connectionDB, `usuarios/${uid}`);
      set(dbRefUsuario, {
        nome: dados.nome,
        email: email,
        funcao: "GARCOM",
        situacao: dados.situacao,
      })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }

  async getUid(emailGarcom) {
    let connectionDB = await this.obterConexao();

    const dbRefUsuarios = ref(connectionDB, "usuarios");
    const snapshot = await get(dbRefUsuarios);

    let uidGarcom = null;
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        if (userData.email === emailGarcom) {
          uidGarcom = childSnapshot.key;
        }
      });
    }

    return uidGarcom;
  }

  async excluir(emailGarcom) {
    let connectionDB = await this.obterConexao();

    const uidGarcom = await this.getUid(emailGarcom);

    if (!uidGarcom) {
      return Promise.reject("Usuário não encontrado.");
    }

    if (uidGarcom) {
      const dbRefUsuario = ref(connectionDB, `usuarios/${uidGarcom}`);
      return new Promise((resolve, reject) => {
        remove(dbRefUsuario)
          .then(() => resolve(true))
          .catch((error) => reject(error));
      });
    } else {
      return Promise.reject("Usuário não encontrado.");
    }
  }
}
