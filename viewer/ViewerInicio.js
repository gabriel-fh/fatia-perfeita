export default class ViewerInicio {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.homeContainer = document.getElementById("home-container");
    this.carrinho = document.getElementById("cart");
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
              <div class='dish-buttons'>
                <Button class='add-item'>Adicionar</Button>
              </div>
            </div>
      `;
      this.homeContainer.appendChild(div);
      const botaoAdicionar = div.querySelector(".add-item");
      botaoAdicionar.addEventListener("click", () => this.#ctrl.adicionarAoCarrinho(produto));

      this.homeContainer.appendChild(div);
    });

    // this.#adicionarEventosAcoes();
  }

  carregarCarrinho(carrinho) {
    const content = this.carrinho.querySelector(".order-bag");
    const footer = this.carrinho.querySelector(".cart-footer");
    content.innerHTML = "";

    if (!carrinho || carrinho.length === 0) {
      content.innerHTML = "<div>Nenhum item no carrinho</div>";
      footer.innerHTML = "";
      return;
    } else {
      footer.innerHTML = `
        <button class="btn btn-primary">Finalizar pedido</button>
      `;
    }

    carrinho.forEach((item) => {
      const div = document.createElement("div");
      div.className = "order-item";
      div.innerHTML = `
                <div class="item-details">
                  <img
                    src="${item.imagem}"
                    alt="${item.nome}"
                  />
                  <p class="item-title">${item.nome}</p>
                  <div class="order-controls">
                    <button class='decrese-item'>-</button>
                    <div class="quantity">${item.quantidade}</div>
                    <button class='add-item'>+</button>
                  </div>
                </div>
          `;

      this.homeContainer.appendChild(div);
      const botaoAdicionar = div.querySelector(".add-item");
      const botaoRemover = div.querySelector(".decrese-item");
      botaoRemover.addEventListener("click", () => this.#ctrl.removerItemDoCarrinho(item));
      botaoAdicionar.addEventListener("click", () => this.#ctrl.adicionarAoCarrinho(item));

      content.appendChild(div);
    });
  }

  toggleCarrinho() {
    const closeCartBtn = document.getElementById("close-cart-btn");
    const cartBtn = document.getElementById("cart-btn");
    cartBtn.addEventListener("click", () => {
      if (this.carrinho.classList.contains("isClosed")) {
        this.carrinho.classList.remove("isClosed");
        this.carrinho.style.right = "0px";
      }
    });
    closeCartBtn.addEventListener("click", () => {
      this.carrinho.classList.add("isClosed");
      this.carrinho.style.right = "-100%";
    });
  }
}
