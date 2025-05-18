import { Endereco } from "../Endereco";
import { ref, get, set } from "firebase/database";
import { database } from "@/src/setup/FirebaseSetup";

export default class DaoEndereco {
  async incluir(endereco: Endereco): Promise<boolean> {
    const countRef = ref(database, `enderecos`);
    const snapshot = await get(countRef);
    const data = snapshot.val();
    const count = data ? Object.keys(data).length : 0;
    const id = count + 1;

    console.log("#DEBUG: Endereço a ser incluído:", endereco);

    console.log("#DEBUG: ID do endereço a ser incluído:", id);


    try {
      const dbRefNovoEndereco = ref(database, `/enderecos/${id}`);
      await set(dbRefNovoEndereco, { ...endereco});
      console.log("#SUCESSO: Endereço criado com sucesso.");
      return true;
    } catch (error: any) {
      console.log("#ERRO incluir:", error.code, error.message);
      return false;
    }
  }
}