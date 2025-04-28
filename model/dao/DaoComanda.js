"use strict";

import {
  getDatabase,
  ref,
  query,
  orderByChild,
  child,
  get,
  set,
  remove,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Comanda from "/model/Comanda.js";
import ModelError from "/model/ModelError.js";
import DaoMesa from "./DaoMesa.js";
import DaoGarcom from "./DaoGarcom.js";

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
      let consulta = query(dbRefComandas);
      let resultPromise = get(consulta);

      resultPromise
        .then(async (dataSnapshot) => {
          console.log(Object.values(dataSnapshot.val()));
          const snapshots = [];
          Object.values(dataSnapshot.val()).forEach((child) => snapshots.push(child));

          for (const snapshot of snapshots) {
            let comandaSnap = snapshot;
            let daoMesa = new DaoMesa();
            let mesa = await daoMesa.obterMesaPeloId(comandaSnap.mesa);

            let daoGarcom = new DaoGarcom();
            let garcom = await daoGarcom.obterGarcomPeloId(comandaSnap.garcom);

            let comanda = new Comanda(
              comandaSnap.codigo,
              parseFloat(comandaSnap.subtotal),
              parseFloat(comandaSnap.total),
              parseFloat(comandaSnap.taxa_servico),
              comandaSnap.situacao,
              comandaSnap.data_hora,
              mesa,
              garcom
            );

            conjComandas.push(comanda);
          }
          console.log(conjComandas);

          resolve(conjComandas);
        })
        .catch((e) => {
          console.log("#ERRO: " + e);
          resolve([]);
        });
    });
  }

  async obterComandaPeloCodigo(codigo) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefComandas = ref(connectionDB, "comandas/" + codigo);
      let consulta = query(dbRefComandas);
      let resultPromise = get(consulta);

      resultPromise.then(async (dataSnapshot) => {
        let comandaSnap = dataSnapshot.val();

        if (comandaSnap != null) {
          let daoMesa = new DaoMesa();
          let mesa = await daoMesa.obterMesaPeloId(comandaSnap.mesa);

          let daoGarcom = new DaoGarcom();
          let garcom = await daoGarcom.obterGarcomPeloId(comandaSnap.garcom);

          const comanda = new Comanda(
            comandaSnap.codigo,
            parseFloat(comandaSnap.subtotal),
            parseFloat(comandaSnap.total),
            parseFloat(comandaSnap.taxa_servico),
            comandaSnap.situacao,
            comandaSnap.data_hora,
            mesa,
            garcom
          );

          resolve(comanda);
        } else {
          resolve(null);
        }
      });
    });
  }

  async incluir(comanda) {
    let connectionDB = await this.obterConexao();
    const dbRefComandas = ref(connectionDB, "comandas");
    const dbRefNovaComanda = child(dbRefComandas, comanda.getCodigo());

    const mesaUid = typeof comanda.mesa === "object" ? comanda.mesa.getUid() : comanda.mesa;
    const garcomUid = typeof comanda.garcom === "object" ? comanda.garcom.getUid() : comanda.garcom;

    if (!mesaUid || !garcomUid) {
      throw new Error("Mesa ou Garçom inválidos.");
    }
    
    const comandaData = {
      codigo: comanda.codigo,
      subtotal: comanda.subtotal,
      total: comanda.total,
      taxa_servico: comanda.taxaServico,
      situacao: comanda.situacao,
      data_hora: comanda.dataHora,
      mesa: mesaUid,
      garcom: garcomUid,
    };

    return set(dbRefNovaComanda, comandaData)
      .then(() => true)
      .catch((e) => {
        console.error("Erro ao incluir comanda:", e);
        throw e;
      });
  }

  //-----------------------------------------------------------------------------------------//

  async alterar(comanda) {
    let connectionDB = await this.obterConexao();
    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let dbRefComandas = ref(connectionDB, "comandas");
      runTransaction(dbRefComandas, (comandas) => {
        let dbRefAlterarComanda = child(dbRefComandas, comanda.getCodigo());

        comanda.mesa = comanda.mesa.getUid();
        comanda.garcom = comanda.garcom.getUid();

        let setPromise = set(dbRefAlterarComanda, comanda);
        setPromise.then(
          (value) => {
            resolve(true);
          },
          (erro) => {
            reject(erro);
          }
        );
      });
    });
    return resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async excluir(comanda) {
    let connectionDB = await this.obterConexao();
    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let dbRefComanda = ref(connectionDB, "comandas");
      runTransaction(dbRefComanda, (comandas) => {
        let dbRefExcluirComanda = child(dbRefComanda, comanda.getCodigo());
        let setPromise = remove(dbRefExcluirComanda, comanda);
        setPromise.then(
          (value) => {
            resolve(true);
          },
          (erro) => {
            reject(erro);
          }
        );
      });
    });
    return resultado;
  }
}
