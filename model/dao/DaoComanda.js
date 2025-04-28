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
        .then((dataSnapshot) => {
          dataSnapshot.forEach(async (dataSnapshotObj) => {
            let comandaSnap = dataSnapshotObj.val();
            let daoMesa = new DaoMesa();
            let mesa = await daoMesa.obterMesaPeloId(comandaSnap.mesa);

            let daoGarcom = new DaoGarcom();
            let garcom = await daoGarcom.obterGarcomPeloId(comandaSnap.garcom);

            conjComandas.push(
              new Comanda(
                comandaSnap.codigo,
                comandaSnap.subtotal,
                comandaSnap.total,
                parseFloat(comandaSnap.taxaServico),
                comandaSnap.situacao,
                comandaSnap.dataHora,
                mesa,
                garcom
              )
            );
          });
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
      let dbRefComandas = ref(connectionDB, "comandas");
      let paramConsulta = orderByChild("codigo").equalTo(codigo);
      let consulta = query(dbRefComandas, paramConsulta);
      let resultPromise = get(consulta);
      resultPromise.then((dataSnapshot) => {
        let comandaSnap = dataSnapshot.val();
        if (comandaSnap != null) {
          let daoMesa = new DaoMesa();
          let mesa = daoMesa.obterMesaPeloId(comandaSnap.mesa);

          let daoGarcom = new DaoGarcom();
          let garcom = daoGarcom.obterGarcomPeloId(comandaSnap.garcom);

          resolve(
            new Comanda(
              comandaSnap.codigo,
              comandaSnap.subtotal,
              comandaSnap.total,
              comandaSnap.taxaServico,
              comandaSnap.dataHora,
              mesa,
              garcom
            )
          );
        } else resolve(null);
      });
    });
  }

  async incluir(comanda) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefComandas = ref(connectionDB, "comandas");
      runTransaction(dbRefComandas, async (comandas) => {
        let dbRefNovaComanda = child(dbRefComandas, comanda.getCodigo());

        const mesaUid = typeof comanda.mesa === "object" ? comanda.mesa.getUid() : comanda.mesa;
        const garcomUid = typeof comanda.garcom === "object" ? comanda.garcom.getUid() : comanda.garcom;

        if (!mesaUid || !garcomUid) {
          reject(new Error("Mesa ou Garçom inválidos."));
          return;
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

        let setPromise = set(dbRefNovaComanda, comandaData);
        setPromise.then(
          () => resolve(true),
          (erro) => reject(erro)
        );
      });
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
