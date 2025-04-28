"use strict";

import DaoMesa from "/model/dao/DaoMesa.js";
import DaoGarcom from "/model/dao/DaoGarcom.js";

export default class ViewerComanda {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;

    this.tbody = document.getElementById("comandas");
    this.modal = document.querySelector(".modal");
    this.modalTitle = document.getElementById("modal-title");
    this.formComanda = document.getElementById("formComanda");

    this.tfCodigo = document.getElementById("tfCodigo");
    this.tfSubtotal = document.getElementById("tfSubtotal");
    this.tfTotal = document.getElementById("tfTotal");
    this.tfTaxaServico = document.getElementById("tfTaxaServico");
    this.cbSituacao = document.getElementById("cbSituacaoComanda");
    this.tfDataHora = document.getElementById("tfDataHora");
    this.cbMesa = document.getElementById("cbMesa");
    this.cbGarcom = document.getElementById("cbGarcom");

    this.modoEdicao = false;
    this.linhaSelecionada = null;

    this.#adicionarEventosModal();
    this.#carregarMesasEGarcons(); // 🆕
  }

  async carregarComandas(comandas) {
    if (!comandas || comandas.length === 0) {
      this.tbody.innerHTML = "<tr><td colspan='7'>Nenhuma comanda encontrada</td></tr>";
      return;
    }

    this.tbody.innerHTML = "";

    comandas.forEach((comanda) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${comanda.codigo}</td>
        <td>${comanda.subtotal.toFixed(2)}</td>
        <td>${comanda.total.toFixed(2)}</td>
        <td>${comanda.taxaServico.toFixed(2)}</td>
        <td>${comanda.situacao}</td>
        <td>${comanda.dataHora}</td>
        <td class="table-actions">
          <button class="btn btn-primary btn-editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-excluir"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      this.tbody.appendChild(tr);
    });

    this.#adicionarEventosAcoes();
  }

  async #carregarMesasEGarcons() {
    try {
      const daoMesa = new DaoMesa();
      const daoGarcom = new DaoGarcom();
      const mesas = await daoMesa.obterMesas();
      const garcons = await daoGarcom.obterGarcons();

      this.cbMesa.innerHTML = '<option value="">Selecione uma mesa</option>';
      mesas.forEach((mesa) => {
        this.cbMesa.innerHTML += `<option value="${mesa.uid}">Mesa ${mesa.numero}</option>`;
      });

      this.cbGarcom.innerHTML = '<option value="">Selecione um garçom</option>';
      garcons.forEach((garcom) => {
        this.cbGarcom.innerHTML += `<option value="${garcom.uid}">${garcom.nome}</option>`;
      });
    } catch (error) {
      console.error("Erro ao carregar mesas ou garçons", error);
    }
  }

  async incluirComanda() {
    try {
      const mesaSelecionada = this.cbMesa.value;
      const garcomSelecionado = this.cbGarcom.value;

      await this.#ctrl.incluir(
        this.tfCodigo.value,
        parseFloat(this.tfSubtotal.value),
        parseFloat(this.tfTotal.value),
        parseFloat(this.tfTaxaServico.value),
        this.cbSituacao.value,
        this.tfDataHora.value,
        mesaSelecionada,
        garcomSelecionado
      );

      this.limparFormulario();
      this.modal.classList.add("hidden");
    } catch (error) {
      console.error(error);
    }
  }

  async alterarComanda() {
    try {
      const mesaSelecionadaUid = this.cbMesa.value;
      const garcomSelecionadoUid = this.cbGarcom.value;

      // Buscar a Mesa e o Garçom reais (objetos)
      const daoMesa = new DaoMesa();
      const daoGarcom = new DaoGarcom();

      const mesaSelecionada = await daoMesa.obterMesaPeloId(mesaSelecionadaUid);
      const garcomSelecionado = await daoGarcom.obterGarcomPeloId(garcomSelecionadoUid);

      // Agora sim, chama o Controller corretamente
      await this.#ctrl.incluir(
        this.tfCodigo.value,
        parseFloat(this.tfSubtotal.value),
        parseFloat(this.tfTotal.value),
        parseFloat(this.tfTaxaServico.value),
        this.cbSituacao.value,
        this.tfDataHora.value,
        mesaSelecionada,
        garcomSelecionado
      );

      this.limparFormulario();
      this.modal.classList.add("hidden");
    } catch (error) {
      console.error(error);
    }
  }

  async excluirComanda() {
    try {
      await this.#ctrl.excluir(Number(this.tfCodigo.value));
      this.limparFormulario();
      this.modal.classList.add("hidden");
    } catch (error) {
      console.error(error);
    }
  }

  #adicionarEventosModal() {
    document.getElementById("btn-adicionar").addEventListener("click", () => {
      this.limparFormulario();
      this.modoEdicao = false;
      this.modalTitle.innerText = "Adicionar Comanda";
      this.modal.classList.remove("hidden");
    });

    document.getElementById("close-cart-btn").addEventListener("click", () => {
      this.modal.classList.add("hidden");
    });

    this.formComanda.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.modoEdicao) this.alterarComanda();
      else this.incluirComanda();
    });
  }

  #adicionarEventosAcoes() {
    this.tbody.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const linha = event.target.closest("tr");
        this.preencherFormulario(linha);
        this.modoEdicao = true;
        this.modalTitle.innerText = "Editar Comanda";
        this.modal.classList.remove("hidden");
      });
    });

    this.tbody.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        const linha = event.target.closest("tr");
        const codigo = linha.children[0].textContent;
        if (confirm(`Deseja excluir a comanda código ${codigo}?`)) {
          try {
            await this.#ctrl.excluir(Number(codigo));
          } catch (error) {
            console.error("Erro ao excluir:", error);
          }
        }
      });
    });
  }

  limparFormulario() {
    this.tfCodigo.value = "";
    this.tfSubtotal.value = "";
    this.tfTotal.value = "";
    this.tfTaxaServico.value = "";
    this.cbSituacao.value = "ABERTA";
    this.cbMesa.value = "";
    this.cbGarcom.value = "";

    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    this.tfDataHora.value = `${ano}-${mes}-${dia}T${horas}:${minutos}`;
  }

  preencherFormulario(linha) {
    this.tfCodigo.value = linha.children[0].textContent;
    this.tfSubtotal.value = linha.children[1].textContent;
    this.tfTotal.value = linha.children[2].textContent;
    this.tfTaxaServico.value = linha.children[3].textContent;
    this.cbSituacaoComanda.value = linha.children[4].textContent;
    this.tfDataHora.value = linha.children[5].textContent;
  }
}
