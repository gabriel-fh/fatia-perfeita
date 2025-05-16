import { auth } from "@/src/setup/FirebaseSetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
export default class CtrlSessao {
  async login({ email, senha }: { email: string; senha: string }) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
    // document.getElementById("login-form").addEventListener("submit", async (event) => {
    //   event.preventDefault();

    //   const email = document.getElementById("email").value;
    //   const senha = document.getElementById("password").value;

    //   try {
    //     const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    //     const user = userCredential.user;
    //     localStorage.setItem("user", JSON.stringify(user));
    //     console.log("Usuário logado: ", user);
    //     window.location.href = "/paginas/inicio.html";
    //   } catch (error) {
    //     console.error("Erro ao fazer login:", error);
    //     alert("Erro ao fazer login: " + error.message);
    //   }
    // });
  }
}
