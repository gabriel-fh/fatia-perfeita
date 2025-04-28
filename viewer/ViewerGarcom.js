import Status from "/model/Status.js";
import ViewerError from "/viewer/ViewerError.js";

export default class ViewerGarcom {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    // this.matricula = document.getElementById("tfMatricula");
    this.nome = document.getElementById("tfNome");
    this.email = document.getElementById("tfEmail");
    // this.horaInicio = document.getElementById("tfHoraInicio");
    // this.horaFim = document.getElementById("tfHoraFim");
    this.situacao = document.getElementById("cbSituacao");

    this.tbody = document.getElementById("garcons");
    this.modal = document.querySelector(".modal");
    this.modalTitle = document.getElementById("modal-title");
    this.formGarcom = document.getElementById("form-garcom");

    this.modoEdicao = false;
    this.linhaSelecionada = null;

    this.#adicionarEventosModal();

    // this.btnSalvar = this.obterElemento("btnSalvar");
    // this.btnEdit = this.obterElemento("btnEdit");
    // this.btnDelete = this.obterElemento("btnDelete");
  }

  async carregarGarcons(garcom) {
    if (!garcom || garcom.length === 0) {
      this.tbody.innerHTML = "<tr><td colspan='8'>Nenhum garcom encontrado</td></tr>";
      return;
    }

    this.tbody.innerHTML = "";

    garcom.forEach((garcom) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${garcom.nome}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${garcom.email}</td>
        <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">${garcom.situacao}</td>
        <td class="table-actions">
          <button class="btn btn-primary btn-editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-excluir"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      this.tbody.appendChild(tr);
    });

    this.#adicionarEventosAcoes();
  }

  async incluirGarcom() {
    try {
      await this.#ctrl.incluir(
        this.tfCodigo.value,
        this.tfNome.value,
        this.tfImagem.value,
        this.tfDescricao.value,
        this.tfTipo.value,
        this.tfpreco_base.value,
        this.cbSituacao.value
      );
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
      this.modalTitle.innerText = "Adicionar Garçom";
      this.modal.classList.remove("hidden");
    });

    this.formGarcom.addEventListener("submit", (e) => {
      e.preventDefault();
      this.incluirGarcom();
    });
  }

  #adicionarEventosAcoes() {
    this.tbody.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const linha = event.target.closest("tr");
        this.preencherFormulario(linha);
        this.modalTitle.innerText = "Editar Garçom";
        this.modal.classList.remove("hidden");
      });
    });

    this.tbody.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const linha = event.target.closest("tr");
        const nome = linha.children[1].textContent;
        if (confirm(`Deseja excluir o garçom ${nome}?`)) {
          linha.remove();
          // Se quiser aqui chamar o Ctrl para excluir do BD, só chamar: this.#ctrl.excluir(codigo)
        }
      });
    });
  }

  limparFormulario() {
    this.nome.value = "";
    this.email.value = "";
    // this.matricula.value = "";
    // this.horaInicio.value = "";
    // this.horaFim.value = "";
    this.situacao.value = "ATIVO";
  }
}
