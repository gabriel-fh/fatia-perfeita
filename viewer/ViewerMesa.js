import MesaDTO from "/model/MesaDTO.js";

export default class ViewerMesa {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    this.tbody = document.getElementById("mesas");
    this.modal = document.querySelector(".modal");
    this.modalTitle = document.getElementById("modal-title");
    this.formMesa = document.getElementById("formMesa");

    this.tfId = document.getElementById("tfId");
    this.tfNumero = document.getElementById("tfNumero");
    this.cbSituacao = document.getElementById("cbSituacaoMesa");

    this.modoEdicao = false;
    this.linhaSelecionada = null;

    this.#adicionarEventosModal();
  }

  async carregarMesas(mesas) {
    if (!mesas || mesas.length === 0) {
      this.tbody.innerHTML = "<tr><td colspan='4'>Nenhuma mesa encontrada</td></tr>";
      return;
    }

    this.tbody.innerHTML = "";

    mesas.forEach((mesa) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${mesa.uid}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${mesa.numero}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${mesa.situacao}</td>
        <td class="table-actions">
          <button class="btn btn-primary btn-editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-excluir"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      this.tbody.appendChild(tr);
    });

    this.#adicionarEventosAcoes();
  }

  async incluirMesa() {
    try {
      await this.#ctrl.incluir(this.tfId.value, Number(this.tfNumero.value), this.cbSituacao.value);
      this.limparFormulario();
      this.modal.classList.add("hidden");
    } catch (error) {
      console.error(error);
    }
  }

  async alterarMesa() {
    try {
      await this.#ctrl.alterar(this.tfId.value, Number(this.tfNumero.value), this.cbSituacao.value);
      this.limparFormulario();
      this.modal.classList.add("hidden");
    } catch (error) {
      console.error(error);
    }
  }

  async excluirMesa() {
    try {
      await this.#ctrl.excluir(this.tfId.value);
      this.limparFormulario();
      this.modal.classList.add("hidden");
    } catch (error) {
      console.error(error);
    }
  }

  #adicionarEventosModal() {
    const closeModalButton = document.getElementById("close-cart-btn");

    closeModalButton.addEventListener("click", () => {
      this.modal.classList.add("hidden");
    });

    document.getElementById("btn-adicionar").addEventListener("click", () => {
      this.limparFormulario();
      this.modoEdicao = false;
      this.tfId.disabled = false; // ✅ Habilitar o campo UID para nova mesa
      this.modalTitle.innerText = "Adicionar Mesa";
      this.modal.classList.remove("hidden");
    });

    this.formMesa.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.modoEdicao) this.alterarMesa();
      else this.incluirMesa();
    });
  }

  #adicionarEventosAcoes() {
    this.tbody.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const linha = event.target.closest("tr");
        this.preencherFormulario(linha);
        this.modoEdicao = true;
        this.tfId.disabled = true; // ✅ Desabilitar o campo UID
        this.modalTitle.innerText = "Editar Mesa";
        this.modal.classList.remove("hidden");
      });
    });

    this.tbody.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        const linha = event.target.closest("tr");
        const id = linha.children[0].textContent;
        const numero = linha.children[1].textContent;

        if (confirm(`Deseja excluir a mesa número ${numero}?`)) {
          try {
            await this.#ctrl.excluir(id);
          } catch (error) {
            console.error("Erro ao excluir:", error);
          }
        }
      });
    });
  }

  limparFormulario() {
    this.tfId.value = "";
    this.tfNumero.value = "";
    this.cbSituacao.value = "LIVRE";
  }

  preencherFormulario(linha) {
    this.tfId.value = linha.children[0].textContent;
    this.tfNumero.value = linha.children[1].textContent;
    this.cbSituacao.value = linha.children[2].textContent;
  }
}
