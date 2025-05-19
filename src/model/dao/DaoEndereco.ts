import { Endereco } from "../Endereco";
import { ref, get, set, push, equalTo, orderByChild, query } from "firebase/database";
import { auth, database } from "@/src/setup/FirebaseSetup";

export default class DaoEndereco {
  async incluir(endereco: Endereco): Promise<Endereco | null> {
    const dbRefEndereco = ref(database, `enderecos`);
    const novoEnderecoRef = push(dbRefEndereco);
    const enderecoId = novoEnderecoRef.key;

    try {
      const dbRefNovoEndereco = ref(database, `/enderecos/${enderecoId}`);

      const enderecoParaSalvar = {
        rua: endereco.getRua(),
        numero: endereco.getNumero(),
        bairro: endereco.getBairro(),
        complemento: endereco.getComplemento(),
        cidade: endereco.getCidade(),
        cep: endereco.getCep(),
        userUid: auth.currentUser?.uid,
      };

      await set(dbRefNovoEndereco, enderecoParaSalvar);

      endereco.setId(enderecoId);
      if (auth.currentUser?.uid) {
        endereco.setUserUid(auth.currentUser.uid);
      }

      return endereco;
    } catch (error: any) {
      console.log("#ERRO incluir:", error.code, error.message);
      return null;
    }
  }

  async obterEnderecoPorId(id: string): Promise<Endereco | null> {
    try {
      const dbRefEndereco = ref(database, `/enderecos/${id}`);
      const snapshot = await get(dbRefEndereco);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const endereco = new Endereco(data.rua, data.numero, data.bairro, data.complemento, data.cidade, data.cep);
        endereco.setId(id);
        return endereco;
      } else {
        console.log("Nenhum endereço encontrado com o ID fornecido.");
        return null;
      }
    } catch (error: any) {
      console.error("Erro ao obter endereço:", error.message);
      throw error;
    }
  }

  async obterEnderecosDoUsuario(uid: string): Promise<Endereco[]> {
    try {
      const dbRefEnderecos = ref(database, `enderecos`);
      const q = query(dbRefEnderecos, orderByChild("userUid"), equalTo(uid));
      const snapshot = await get(q);
      const enderecos: Endereco[] = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const endereco = new Endereco(data.rua, data.numero, data.bairro, data.complemento, data.cidade, data.cep);
          endereco.setId(childSnapshot.key);
          endereco.setUserUid(uid);
          enderecos.push(endereco);
        });
      } else {
        console.log("Nenhum endereço encontrado para o usuário.");
      }

      return enderecos;
    } catch (error: any) {
      if (error.code === "PERMISSION_DENIED") {
        console.error("Permissão negada para acessar os endereços:", error.message);
      } else {
        console.error("Erro ao obter endereços:", error.message);
      }
      throw error;
    }
  }
}