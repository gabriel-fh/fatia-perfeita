export default class ViewerInicio {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.homeContainer = document.getElementById("home-container");
    // this.tbody = document.getElementById("produtos");
    // this.modal = document.querySelector(".modal");
    // this.modalTitle = document.getElementById("modal-title");
    // this.formProduto = document.getElementById("form-produto");

    // this.modoEdicao = false;
    // this.linhaSelecionada = null;

    // this.#adicionarEventosModal();
  }

  async carregarProdutos(produtos) {
    if (!produtos || produtos.length === 0) {
      this.tbody.innerHTML = "<div>Nenhum produto encontrado</div>";
      return;
    }

    console.log(produtos);
    this.homeContainer.innerHTML = "";

    produtos.forEach((produto) => {
      const div = document.createElement("div");
      div.className = "dishes";
      div.innerHTML = `
            <div class="dish">
              <img
                src="${produto.imagem}"
                alt="Suspiro"
              />
              <p>${produto.nome}</p>
              <button>Adicionar +</button>
            </div>
      `;
      this.homeContainer.appendChild(div);
    });

    // this.#adicionarEventosAcoes();
  }
}
