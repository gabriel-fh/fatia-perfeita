import Usuario, { FuncaoUsuario } from "@/src/model/Usuario";
import {
  ref,
  get,
  set,
} from "firebase/database";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, database } from "@/src/setup/FirebaseSetup";

export default class DaoUsuario {
  async obterUsuarioPeloUID(uid: string): Promise<Usuario | null> {
    try {
      const dbRefUsuario = ref(database, `/usuarios/${uid}`);
      const snapshot = await get(dbRefUsuario);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return new Usuario(uid, data.nome, data.email, data.telefone, data.funcao, data.cpf);
      } else {
        console.log("Nenhum dado encontrado para o UID fornecido.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      throw error;
    }
  }

  async criarConta(
    email: string,
    senha: string,
    nome: string,
    telefone: string,
    funcao: FuncaoUsuario,
    cpf: string
  ): Promise<Usuario | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const usuario = new Usuario(user.uid, nome, email, telefone, funcao, cpf);
      const dbRefNovoUsuario = ref(database, `/usuarios/${user.uid}`);
      await set(dbRefNovoUsuario, usuario);
      
      return usuario;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async obterEnderecosDoUsuario(uid: string): Promise<any[]> {}
}
