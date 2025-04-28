import ModelError from "../model/ModelError.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { firebaseConfig } from "./../controller/CtrlSessao.js";

export const criarUsuario = async (email, senha) => {
  // Cria uma segunda instância do app
  const secondaryApp = initializeApp(firebaseConfig, "Secondary");

  const secondaryAuth = getAuth(secondaryApp);

  try {
    // Cria o novo usuário usando a segunda instância
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, senha);
    const user = userCredential.user;

    // Depois de criar o usuário, fecha o secondary app para liberar memória e sessões

    return user;
  } catch (error) {
    console.error(error);
    throw new ModelError("Erro ao criar usuário: " + error.message);
  }
};

