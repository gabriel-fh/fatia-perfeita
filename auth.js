import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para fazer login
const signInUser = (email, password) => {

  const form = document.getElementById("login-form");
  const hiddenElements = document.querySelectorAll(".hidden");
  const main = document.getElementsByTagName("main")[0];
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado: ", user);
      hiddenElements.forEach((element) => {
        element.classList.remove("hidden");
      })
      form.classList.add("hidden")
      main.classList.remove("flex-center")
      localStorage.setItem("user", JSON.stringify(user));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Exibir mensagem de erro no formulário
      document.getElementById("error-message").innerText = `Erro: ${errorMessage}`;
      console.log(errorCode, errorMessage);
    });
};

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInUser(email, password);
});