import CardProduto from "@/components/CardProduto";
import Produto from "../model/Produto";
import CtrlManterProdutos from "../controller/CtrlManterProdutos";

export default class ViewerProduto {
  #ctrl;

  constructor(ctrl: CtrlManterProdutos) {
    this.#ctrl = ctrl;
  }

  async carregarProdutos(produtos : Produto[]) {
    produtos.map((item, idx) => {
      return <CardProduto key={idx} produto={item} />
    })
  }

  // async incluirProduto() {
  //   try {
  //     await this.#ctrl.incluir(
  //       this.tfCodigo.value,
  //       this.tfNome.value,
  //       this.tfImagem.value,
  //       this.tfDescricao.value,
  //       this.tfTipo.value,
  //       this.tfpreco_base.value,
  //       this.cbSituacao.value
  //     );
  //     this.limparFormulario();
  //     this.modal.classList.add("hidden");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async alterarProduto() {
  //   try {
  //     await this.#ctrl.alterar(
  //       this.tfCodigo.value,
  //       this.tfNome.value,
  //       this.tfImagem.value,
  //       this.tfDescricao.value,
  //       this.tfTipo.value,
  //       this.tfpreco_base.value,
  //       this.cbSituacao.value
  //     );
  //     this.limparFormulario();
  //     this.modal.classList.add("hidden");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async excluirProduto() {
  //   try {
  //     await this.#ctrl.excluir(this.tfCodigo.value);
  //     this.limparFormulario();
  //     this.modal.classList.add("hidden");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // #adicionarEventosModal() {
  //   const closeModalButton = document.getElementById("close-cart-btn");

  //   closeModalButton.addEventListener("click", () => {
  //     this.modal.classList.add("hidden");
  //   });

  //   document.getElementById("btn-adicionar").addEventListener("click", () => {
  //     this.limparFormulario();
  //     this.modoEdicao = false;
  //     this.modalTitle.innerText = "Adicionar Produto";
  //     this.modal.classList.remove("hidden");
  //   });

  //   this.formProduto.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     if (this.modoEdicao) this.alterarProduto();
  //     else this.incluirProduto();
  //   });
  // }

  // #adicionarEventosAcoes() {
  //   this.tbody.querySelectorAll(".btn-editar").forEach((btn) => {
  //     btn.addEventListener("click", (event) => {
  //       const linha = event.target.closest("tr");
  //       this.preencherFormulario(linha);
  //       this.modalTitle.innerText = "Editar Produto";
  //       this.modal.classList.remove("hidden");
  //     });
  //   });

  //   this.tbody.querySelectorAll(".btn-excluir").forEach((btn) => {
  //     btn.addEventListener("click", async (event) => {
  //       const linha = event.target.closest("tr");
  //       const codigo = linha.children[0].textContent;
  //       const nome = linha.children[1].textContent;

  //       if (confirm(`Deseja excluir o produto ${nome}?`)) {
  //         try {
  //           await this.#ctrl.excluir(codigo);
  //         } catch (error) {
  //           console.error("Erro ao excluir:", error);
  //         }
  //       }
  //     });
  //   });
  // }

  // limparFormulario() {
  //   this.tfCodigo.value = "";
  //   this.tfNome.value = "";
  //   this.tfImagem.value = "";
  //   this.tfDescricao.value = "";
  //   this.tfTipo.value = "DELIVERY";
  //   this.tfpreco_base.value = "";
  //   this.cbSituacao.value = "DISPONIVEL";
  // }

  // preencherFormulario(linha) {
  //   this.tfCodigo.value = linha.children[0].textContent;
  //   this.tfNome.value = linha.children[1].textContent;
  //   this.tfImagem.value = linha.children[2].textContent;
  //   this.tfDescricao.value = linha.children[3].textContent;
  //   this.tfTipo.value = linha.children[4].textContent;
  //   this.tfpreco_base.value = linha.children[5].textContent;
  //   this.cbSituacao.value = linha.children[6].textContent;
  // }
}
