

import Produto from "../Produto";
import { ref, get, set, remove } from "firebase/database";
import { database } from "@/src/setup/FirebaseSetup";

export default class DaoProduto {
  static promessaConexao: Promise<any> | null = null;

  async obterProdutos(): Promise<Produto[]> {
    const produtosRef = ref(database, "/produtos");
    const snapshot = await get(produtosRef);
    const data = snapshot.val();
    const produtos: Produto[] = [];

    if (data) {
      Object.keys(data).forEach((key) => {
        const p = data[key];
        produtos.push(
          new Produto(
            p.codigo,
            p.nome,
            p.imagem,
            p.descricao,
            p.tipo,
            p.preco_base,
            p.situacao
          )
        );
      });
    }

    return produtos;
  }

  async obterProdutoPeloCodigo(codigo: string): Promise<Produto | null> {
    const produtosRef = ref(database, "/produtos");
    const snapshot = await get(produtosRef);
    const data = snapshot.val();

    if (data) {
      for (const key of Object.keys(data)) {
        const p = data[key];
        if (p.codigo === codigo) {
          return new Produto(
            p.codigo,
            p.nome,
            p.imagem,
            p.descricao,
            p.tipo,
            p.preco_base,
            p.situacao
          );
        }
      }
    }

    return null;
  }


  async incluir(produto: Produto): Promise<boolean> {
    try {
      const dbRefNovoProduto = ref(database, `/produtos/${produto.getCodigo()}`);
      await set(dbRefNovoProduto, produto);
      return true;
    } catch (error) {
      console.log("#ERRO incluir:", error);
      return false;
    }
  }

  async alterar(produto: Produto): Promise<boolean> {
    try {
      const dbRefProduto = ref(database, `/produtos/${produto.getCodigo()}`);
      await set(dbRefProduto, produto);
      return true;
    } catch (error) {
      console.log("#ERRO alterar:", error);
      return false;
    }
  }

  async excluir(produtoCodigo: string): Promise<boolean> {
    try {
      const dbRefProduto = ref(database, `/produtos/${produtoCodigo}`);
      await remove(dbRefProduto);
      return true;
    } catch (error) {
      console.log("#ERRO excluir:", error);
      return false;
    }
  }
}
