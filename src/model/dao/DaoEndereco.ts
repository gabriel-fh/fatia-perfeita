import { Endereco } from "../Endereco";
import { ref, get, set, push } from "firebase/database";
import { database } from "@/src/setup/FirebaseSetup";

export default class DaoEndereco {
  async incluir(endereco: Endereco): Promise<boolean> {
    const dbRefEndereco = ref(database, `enderecos`);
    const novoEnderecoRef = push(dbRefEndereco);
    const enderecoId = novoEnderecoRef.key;

    try {
      const dbRefNovoEndereco = ref(database, `/enderecos/${enderecoId}`);
      await set(dbRefNovoEndereco, { ...endereco });

      const dbRefCliente = ref(database, `/usuarios/${endereco.getUserUid()}/enderecos/${enderecoId}`);
      await set(dbRefCliente, true);

      console.log("#SUCESSO: Endereço criado com sucesso.");
      return true;
    } catch (error: any) {
      console.log("#ERRO incluir:", error.code, error.message);
      return false;
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
      const dbRefEnderecos = ref(database, `/usuarios/${uid}/enderecos`);
      const snapshot = await get(dbRefEnderecos);
      const enderecos: Endereco[] = [];

      if (snapshot.exists()) {
        const data = snapshot.val();
        const enderecoKeys = Object.keys(data);

        if (enderecoKeys.length === 0) {
          console.log("Nenhum endereço encontrado para o usuário.");
          return enderecos;
        }
        for (const key of enderecoKeys) {
          const endereco = await this.obterEnderecoPorId(key);
          if (endereco) {
            enderecos.push(endereco);
          }
        }
        return enderecos;
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