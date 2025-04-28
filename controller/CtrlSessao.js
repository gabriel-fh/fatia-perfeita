"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithRedirect, signInWithPopup, browserSessionPersistence, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

import DaoUsuario from "/model/dao/DaoUsuario.js";
import Usuario from "/model/Usuario.js";
import CtrlManterProdutos from "/controller/CtrlManterProdutos.js";
import CtrlManterGarcons from "/controller/CtrlManterGarcons.js";
import CtrlManterMesas from "/controller/CtrlManterMesas.js";


const firebaseConfig = {
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

export default class CtrlSessao {

    #daoUsuario;

    //-----------------------------------------------------------------------------------------//  
    constructor() {
        this.init();
    }

    //-----------------------------------------------------------------------------------------//  

    async init() {
        try {
            this.usuario = await this.verificandoLogin();
            // Observe abaixo que temos um problema de ACOPLAMENTO, pois se 
            // precisarmos acrescentar um novo controlador de caso de uso, precisaremos
            // abrir esse arquivo para alteração. O melhor seria implementar um 
            // mecanismo de INJEÇÃO DE DEPENDÊNCIA.     
            if (document.URL.includes("produtos.html"))
                this.ctrlAtual = new CtrlManterProdutos();
            else if (document.URL.includes("garcons.html"))
                this.ctrlAtual = new CtrlManterGarcons();
            else if (document.URL.includes("mesas.html"))
                this.ctrlAtual = new CtrlManterMesas();
            // else if (document.URL.includes("index.html"))
            //     this.ctrlAtual = new CtrlManterProdutos();
        } catch (e) {
            alert(e);
        }
    }

    //-----------------------------------------------------------------------------------------//  

    async verificandoLogin() {
        return new Promise((resolve, reject) => {
            //const provider = new GoogleAuthProvider();
            //provider.addScope("https://www.googleapis.com/auth/userinfo.email");
            //provider.addScope("https://www.googleapis.com/auth/userinfo.profile");      
            const auth = getAuth(app);
            auth.setPersistence(browserSessionPersistence);
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.#daoUsuario = new DaoUsuario();
                    let usrSistema = await this.#daoUsuario.obterUsuarioPeloUID(user.uid);

                    if (usrSistema) {
                        resolve(user);
                    } else {
                        reject('Usuário inexistente.');
                    }
                    
                } else {
                    reject('Você não realizou a autenticação!');
                }
            });
        });
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

