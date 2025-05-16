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
  }
}
