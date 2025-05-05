

import Produto from "../Produto";
import ModelError from "../ModelError";

// Definindo a tipagem para a classe DaoProduto
export default class DaoProduto {
  static promessaConexao: Promise<any> | null = null;

  constructor() {
    this.obterConexao();
  }

  // Tipagem da função obterConexao
  async obterConexao(): Promise<any> {
    if (DaoProduto.promessaConexao == null) {
      DaoProduto.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if (db) resolve(db);
        else reject(new ModelError("Não foi possível conectar ao banco de dados"));
      });
    }
    return DaoProduto.promessaConexao;
  }

  // Tipagem da função obterProdutos
  async obterProdutos(): Promise<Produto[]> {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let conjProdutos: Produto[] = [];
      let dbRefProdutos = ref(connectionDB, "produtos");
      let consulta = query(dbRefProdutos, orderByChild("codigo"));
      let resultPromise = get(consulta);

      resultPromise
        .then((dataSnapshot) => {
          dataSnapshot.forEach((dataSnapshotObj) => {
            let elem = dataSnapshotObj.val();
            let produto = new Produto(
              elem.codigo, // codigo
              elem.nome, // nome
              elem.imagem, // imagem
              elem.descricao, // descricao
              elem.tipo, // tipo
              elem.preco_base, // preco_base
              elem.situacao // situacao
            );
            conjProdutos.push(produto);
          });
          resolve(conjProdutos);
        })
        .catch((e) => {
          console.error("#ERRO: " + e);
          resolve([]);
        });
    });
  }

  // Tipagem da função obterProdutoPeloCodigo
  async obterProdutoPeloCodigo(codigo: string): Promise<Produto | null> {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve) => {
      let dbRefCurso = ref(connectionDB, "produtos/" + codigo);
      let consulta = query(dbRefCurso);
      let resultPromise = get(consulta);
      resultPromise.then((dataSnapshot) => {
        let produtoSnap = dataSnapshot.val();
        if (produtoSnap != null) {
          resolve(
            new Produto(
              produtoSnap.codigo,
              produtoSnap.nome,
              produtoSnap.imagem,
              produtoSnap.descricao,
              produtoSnap.tipo,
              produtoSnap.preco_base,
              produtoSnap.situacao
            )
          );
        } else {
          resolve(null);
        }
      });
    });
  }

  // Tipagem da função incluir
  async incluir(produto: Produto): Promise<boolean> {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefProdutos = ref(connectionDB, "produtos");
      runTransaction(dbRefProdutos, (produtos) => {
        let dbRefNovoProduto = child(dbRefProdutos, produto.getCodigo());
        let setPromise = set(dbRefNovoProduto, produto);
        setPromise
          .then(() => {
            resolve(true);
          })
          .catch((e) => {
            console.log("#ERRO: " + e);
            resolve(false);
          });
      });
    });
  }

  // Tipagem da função alterar
  async alterar(produto: Produto): Promise<boolean> {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefProdutos = ref(connectionDB, "produtos");
      runTransaction(dbRefProdutos, (produtos) => {
        let dbRefProdutoAlterado = child(dbRefProdutos, produto.getCodigo());
        let setPromise = set(dbRefProdutoAlterado, produto);
        setPromise
          .then(() => {
            resolve(true);
          })
          .catch((e) => {
            console.log("#ERRO: " + e);
            resolve(false);
          });
      });
    });
  }

  // Tipagem da função excluir
  async excluir(produto: Produto): Promise<boolean> {
    let connectionDB = await this.obterConexao();
    return new Promise((resolve, reject) => {
      let dbRefProdutos = ref(connectionDB, "produtos");
      runTransaction(dbRefProdutos, (produtos) => {
        let dbRefExcluirProduto = child(dbRefProdutos, produto.getCodigo());
        let setPromise = remove(dbRefExcluirProduto, produtos);
        setPromise
          .then(() => {
            resolve(true);
          })
          .catch((e) => {
            console.log("#ERRO: " + e);
            resolve(false);
          });
      });
    });
  }
}
