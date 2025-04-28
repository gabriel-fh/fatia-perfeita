"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

import CtrlManterProdutos from "/controller/CtrlManterProdutos.js";
import CtrlManterGarcons from "/controller/CtrlManterGarcons.js";
import CtrlManterMesas from "./CtrlManterMesas.js";
import CtrlInicio from "./CtrlInicio.js";

export const firebaseConfig = {
  apiKey: "AIzaSyD83f2LeSDIuVWBFUnu_jHOzshsjDkF5iI",
  authDomain: "fatia-perfeita.firebaseapp.com",
  databaseURL: "https://fatia-perfeita-default-rtdb.firebaseio.com",
  projectId: "fatia-perfeita",
  storageBucket: "fatia-perfeita.firebasestorage.app",
  messagingSenderId: "470134118547",
  appId: "1:470134118547:web:57d1e244064470e9079566",
  measurementId: "G-57F0MG0EYV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Obtém a referência ao banco de dados

(async() => {
  console.log(auth); 
})()

export default class CtrlSessao {
  constructor() {
    this.init();
  }

  //-----------------------------------------------------------------------------------------//

  async init() {
    try {
      this.usuario = await this.verificandoLogin();
      if (document.URL.includes("produtos.html")) this.ctrlAtual = new CtrlManterProdutos();
      else if (document.URL.includes("garcons.html")) this.ctrlAtual = new CtrlManterGarcons();
      else if (document.URL.includes("mesas.html")) this.ctrlAtual = new CtrlManterMesas();
      else if (document.URL.includes("pedidos.html")) this.ctrlAtual = new CtrlPedidos();
      else if (document.URL.includes("comandas.html")) this.ctrlAtual = new CtrlComandas();
      else if (document.URL.includes("inicio.html")) this.ctrlAtual = new CtrlInicio();
      else if (document.URL.includes("index.html") || window.location.href === "/") this.ctrlAtual = await this.login();
    } catch (e) {
      alert(e);
    }
  }

  //-----------------------------------------------------------------------------------------//

  async login() {
    this.usuario = await this.verificandoLogin();

    document.getElementById("login-form").addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("password").value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Usuário logado: ", user);
        window.location.href = "/paginas/inicio.html";
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login: " + error.message);
      }
    });
  }

  async verificandoLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const uid = user.uid;
      const userRef = ref(db, `usuarios/${uid}`);

      try {
        // const snapshot = await get(userRef);
        // if (snapshot.exists()) {
        //   return snapshot.val();
        // } else {
        //   window.location.href = "/index.html";
        //   alert("Erro ao buscar dados do usuário: " + error.message);
        //   // localStorage.removeItem("user");
        // }
      } catch (error) {
        window.location.href = "/index.html";
        alert("Erro ao buscar dados do usuário: " + error.message);
        // localStorage.removeItem("user");
      }
    } else {
      window.location.href = "/index.html";
    }

    // return new Promise((resolve, reject) => {
    //   onAuthStateChanged(auth, async (user) => {
    //     if (user) {
    //       this.#daoUsuario = new DaoUsuario();
    //       let usrSistema = await this.#daoUsuario.obterUsuarioPeloUID(user.uid);

    //       if (usrSistema) {
    //         resolve(user);
    //       } else {
    //         reject("Usuário inexistente.");
    //       }
    //     } else {
    //       reject("Você não realizou a autenticação!");
    //     }
    //   });
    // });
  }

  // async getLoggedUser() {
  //     return new Promise(async (resolve, reject) => {
  //         const user = JSON.parse(localStorage.getItem("user"));

  //         if (user) {
  //             const uid = user.uid;
  //             const userRef = ref(db, `usuarios/${uid}`);

  //             try {
  //                 const snapshot = await get(userRef);
  //                 if (snapshot.exists()) {
  //                     resolve(snapshot.val());
  //                 } else {
  //                     reject('Nenhum dado encontrado para o usuário.');
  //                 }
  //             } catch (error) {
  //                 reject(error);
  //             }
  //         } else {
  //             reject('Nenhum usuário logado encontrado');
  //         }
  //     });
  // };
}

//------------------------------------------------------------------------//
new CtrlSessao();
