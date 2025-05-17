import Usuario from "@/src/model/Usuario";
import UsuarioDTO from "@/src/model/UsuarioDto";
import ModelError from "@/src/model/ModelError";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  set,
  remove,
} from "firebase/database";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/src/setup/FirebaseSetup";

export default class DaoUsuario {
  static promessaConexao: Promise<any> | null = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoUsuario.promessaConexao == null) {
      DaoUsuario.promessaConexao = new Promise(function (resolve, reject) {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível estabelecer conexão com o BD"));
      });
    }
    return DaoUsuario.promessaConexao;
  }

  async obterUsuarioPeloUID(uid: string): Promise<Usuario | null> {
    const connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      const dbRefUsuario = ref(connectionDB, "usuarios/" + uid);
      const consulta = query(dbRefUsuario);
      const resultPromise = get(consulta);
      resultPromise.then((dataSnapshot) => {
        const user = dataSnapshot.val();
        if (user != null) resolve(new Usuario(user.uid, user.nome, user.email, user.telefone, user.funcao, user.cpf));
        else resolve(null);
      });
    });
  }

  async obterUsuarioPeloEmail(email: string): Promise<Usuario | null> {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      const dbRefUsuario = ref(connectionDB, "usuarios");
      const paramConsulta = orderByChild("email");
      const paramEqual = equalTo(email);
      const consulta = query(dbRefUsuario, paramConsulta, paramEqual);
      const resultPromise = get(consulta);
      resultPromise.then((dataSnapshot) => {
        const user = dataSnapshot.val();
        if (user != null) resolve(new Usuario(user.uid, user.nome, user.email, user.telefone, user.funcao, user.cpf));
        else resolve(null);
      });
    });
  }

  async obterUsuarios() {
    let connectionDB = await this.obterConexao();

    return new Promise((resolve) => {
      const conjUsuarios: Usuario[] = [];
      const dbRefUsuarios = ref(connectionDB, "usuarios");
      const paramConsulta = orderByChild("email");
      const consulta = query(dbRefUsuarios, paramConsulta);
      const resultPromise = get(consulta);
      resultPromise.then(
        (dataSnapshot) => {
          dataSnapshot.forEach((dataSnapshotObj) => {
            const chave = dataSnapshotObj.key;
            const elem = dataSnapshotObj.val();
            conjUsuarios.push(new Usuario(elem.uid, elem.nome, elem.email, elem.telefone, elem.funcao, elem.cpf));
          });
          resolve(conjUsuarios);
        },
        (e) => console.log("#" + e)
      );
    });
  }

  async criarConta(email: string, senha: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async incluir(usuario: Usuario): Promise<boolean> {
    const connectionDB = await this.obterConexao();
    const resultado = new Promise<boolean>((resolve, reject) => {
      const dbRefUsuario = ref(connectionDB, "usuarios/" + usuario.getUid());
      const setPromise = set(dbRefUsuario, new UsuarioDTO(usuario));
      setPromise.then(
        (value) => {
          resolve(true);
        },
        (erro) => {
          reject(erro);
        }
      );
    });
    return resultado;
  }

  async excluir(usuario: Usuario): Promise<unknown> {
    let connectionDB = await this.obterConexao();
    let resultado = new Promise((resolve, reject) => {
      let dbRefUsuario = ref(connectionDB, "usuarios/" + usuario.getUid());
      let setPromise = remove(dbRefUsuario);
      setPromise.then(
        (value) => {
          resolve(true);
        },
        (erro) => {
          reject(erro);
        }
      );
    });
    return resultado;
  }
}
