"use strict";

import { getDatabase, ref, query, orderByChild, get, set, remove, runTransaction }
  from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import Comanda from "/model/Comanda.js";
import ModelError from "/model/ModelError.js";
import DaoMesa from "./DaoMesa";
import DaoGarcom from "./DaoGarcom";

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
      let dbRefComandas = ref(connectionDB, 'comandas');
      let consulta = query(dbRefComandas);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        dataSnapshot.forEach(dataSnapshotObj => {
          let comandaSnap = dataSnapshotObj.val();
          let daoMesa = new DaoMesa();
          let mesa = daoMesa.obterMesaPeloId(comandaSnap.mesa);

          let daoGarcom = new DaoGarcom();
          let garcom = daoGarcom.obterGarcomPeloId(comandaSnap.garcom);


          conjComandas.push(
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
        });
        resolve(conjComandas);
      }).catch((e) => { console.log("#ERRO: " + e); resolve([]) });
    });
  }

  async obterComandaPeloCodigo(codigo) {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefComandas = ref(connectionDB, 'comandas');
      let paramConsulta = orderByChild('codigo').equalTo(codigo);
      let consulta = query(dbRefComandas, paramConsulta);
      let resultPromise = get(consulta);
      resultPromise.then(dataSnapshot => {
        let comandaSnap = dataSnapshot.val();
        if (comandaSnap != null) {
          let daoMesa = new DaoMesa();
          let mesa = daoMesa.obterMesaPeloId(comandaSnap.mesa);

          let daoGarcom = new DaoGarcom();
          let garcom = daoGarcom.obterGarcomPeloId(comandaSnap.garcom);

          resolve(
            new Comanda(
              new Comanda(
                comandaSnap.codigo,
                comandaSnap.subtotal,
                comandaSnap.total,
                comandaSnap.taxaServico,
                comandaSnap.dataHora,
                mesa,
                garcom
              )
            )
          );
        }
        else
          resolve(null);
      });
    });
  }

  async incluir(comanda) {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefComandas = ref(connectionDB, 'comandas');
      runTransaction(dbRefComandas, async (comandas) => {
        let dbRefNovaComanda;
        comanda.mesa = comanda.mesa.getUid();
        comanda.garcom = comanda.garcom.getUid();
        let setPromise = set(dbRefNovaComanda, comanda);
        setPromise.then(value => { resolve(true) }, erro => { reject(erro) });
      });
    });
    return resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async alterar(comanda) {
    let connectionDB = await this.obterConexao();
    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let dbRefComandas = ref(connectionDB, 'comandas');
      runTransaction(dbRefComandas, (comandas) => {
        let dbRefAlterarComanda = child(dbRefComandas, comanda.getCodigo());

        comanda.mesa = comanda.mesa.getUid();
        comanda.garcom = comanda.garcom.getUid();

        let setPromise = set(dbRefAlterarComanda, comanda);
        setPromise.then(value => { resolve(true) }, erro => { reject(erro) });
      });
    });
    return resultado;
  }

  //-----------------------------------------------------------------------------------------//

  async excluir(comanda) {
    let connectionDB = await this.obterConexao();
    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let dbRefComanda = ref(connectionDB, 'comandas');
      runTransaction(dbRefComanda, (comandas) => {
        let dbRefExcluirComanda = child(dbRefComanda, comanda.getCodigo());
        let setPromise = remove(dbRefExcluirComanda, comanda);
        setPromise.then(value => { resolve(true) }, erro => { reject(erro) });
      });
    });
    return resultado;
  }
}
