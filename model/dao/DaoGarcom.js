"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction } 
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

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
      let dbRefGarcons = ref(connectionDB, "garcons");
      let consulta = query(dbRefGarcons, orderByChild("matricula"));
      let resultPromise = get(consulta);

      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let elem = dataSnapshotObj.val();
          let garcom = new Garcom(
            elem.nome,
            elem.email,
            elem.matricula,
            elem.horaInicio,
            elem.horaFim,
            elem.situacao
          );
          conjGarcons.push(garcom);
        });
        resolve(conjGarcons);
      }).catch(e => {
        console.error("#ERRO: " + e);
        resolve([]);
      });
    });
  }

  async incluir(garcom) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefGarcom = ref(connectionDB, `garcons/${garcom.getMatricula()}`);
      set(dbRefGarcom, {
        nome: garcom.getNome(),
        email: garcom.getEmail(),
        matricula: garcom.getMatricula(),
        horaInicio: garcom.getHoraInicio(),
        horaFim: garcom.getHoraFim(),
        situacao: garcom.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async alterar(garcom) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefGarcom = ref(connectionDB, `garcons/${garcom.getMatricula()}`);
      set(dbRefGarcom, {
        nome: garcom.getNome(),
        email: garcom.getEmail(),
        matricula: garcom.getMatricula(),
        horaInicio: garcom.getHoraInicio(),
        horaFim: garcom.getHoraFim(),
        situacao: garcom.getSituacao()
      }).then(() => resolve(true))
        .catch(error => reject(error));
    });
  }

  async excluir(garcom) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      const dbRefGarcom = ref(connectionDB, `garcons/${garcom.getMatricula()}`);
      remove(dbRefGarcom)
        .then(() => resolve(true))
        .catch(error => reject(error));
    });
  }
}
