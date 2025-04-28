import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import ModelError from "../model/ModelError.js";

export const criarUsuario = async (email, senha) => {
  const auth = getAuth(); // instancia do auth

  try {
    // 1. Criar usuário no Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    return user;
  } catch (error) {
    throw new ModelError("Erro ao criar usuário: " + error.message);
  }
}
