import { database } from "@/src/setup/FirebaseSetup";
import { ref, get, set, remove } from "firebase/database";
import Produto from "../model/Produto";
import ViewerProduto from "../viewer/ViewerProduto";

export default class CtrlManterProdutos {
  viewer: ViewerProduto;

  constructor(viewer: ViewerProduto) {
    this.viewer = viewer;
  }

  async carregar() {
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

  async incluir(produto: Produto) {
    const refProduto = ref(database, `produtos/${produto.getCodigo()}`);
    await set(refProduto, produto);
    this.carregar();
  }

  async alterar(produto: Produto) {
    const refProduto = ref(database, `produtos/${produto.getCodigo()}`);
    await set(refProduto, produto);
    this.carregar();
  }

  async excluir(codigo: string) {
    const refProduto = ref(database, `produtos/${codigo}`);
    await remove(refProduto);
    this.carregar();
  }

}
