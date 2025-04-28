import DaoProduto from "/model/dao/DaoProduto.js";
import ProdutoDTO from "/model/ProdutoDTO.js";

export default class ViewerProduto {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    this.tbody = document.getElementById("produtos");
    this.modal = document.querySelector(".modal");
    this.modalTitle = document.getElementById("modal-title");

    // this.tfCodigo = this.obterElemento("tfCodigo");
    // this.tfNome = this.obterElemento("tfNome");
    // this.tfImagem = this.obterElemento("tfImagem");
    // this.tfDescricao = this.obterElemento("tfDescricao");
    // this.tfTipo = this.obterElemento("tfTipo");
    // this.tfPrecoBase = this.obterElemento("tfPrecoBase");
    // this.cbSituacao = this.obterElemento("cbSituacao");

    // this.carregarProdutos(ctrl);
  }

  async carregarProdutos(produtos) {
    if (!produtos || produtos.length === 0) {
      this.tbody.innerHTML = "<tr><td colspan='8'>Nenhum produto encontrado</td></tr>";
      return;
    }
    console.log(produtos);

    this.tbody.innerHTML = "";

    produtos.forEach((produto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.codigo}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.nome}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.imagem}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.descricao}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.tipo}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.precoBase}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${produto.situacao}</td>
        <td class="table-actions">
          <button class="btn btn-primary btn-editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-excluir"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      this.tbody.appendChild(tr);
    });

    this.#adicionarEventosAcoes();
  }

  #adicionarEventosAcoes() {
    this.tbody.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const linha = event.target.closest("tr");
        this.preencherFormulario(linha);
        this.modoEdicao = true;
        this.modalTitle.innerText = "Editar Produto";
        this.modal.classList.remove("hidden");
      });
    });

    this.tbody.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const linha = event.target.closest("tr");
        const nome = linha.children[1].textContent;
        if (confirm(`Deseja excluir o produto ${nome}?`)) {
          linha.remove();
          // Aqui você poderia também chamar um método do CtrlManterProdutos para deletar no banco
        }
      });
    });
  }

  limparFormulario() {
    this.tfCodigo.value = "";
    this.tfNome.value = "";
    this.tfImagem.value = "";
    this.tfDescricao.value = "";
    this.tfTipo.value = "ALIMENTO";
    this.tfPrecoBase.value = "";
    this.cbSituacao.value = "DISPONIVEL";
  }

  preencherFormulario(linha) {
    this.tfCodigo.value = linha.children[0].textContent;
    this.tfNome.value = linha.children[1].textContent;
    this.tfImagem.value = linha.children[2].textContent;
    this.tfDescricao.value = linha.children[3].textContent;
    this.tfTipo.value = linha.children[4].textContent;
    this.tfPrecoBase.value = linha.children[5].textContent;
    this.cbSituacao.value = linha.children[6].textContent;
  }

  // O resto das funções (statusApresentacao, statusEdicao, apresentar) continuam iguais
}
