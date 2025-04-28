// MesaDTO.js
export default class MesaDTO {

    constructor(mesa) {
      this.uid = mesa.getUid();
      this.nome = mesa.getNome();
      this.email = mesa.getEmail();
      this.funcao = mesa.getFuncao();
      this.numero = mesa.getNumero();
      this.situacao = mesa.getSituacao();
    }
  
    getUid() {
      return this.uid;
    }
  
    getNome() {
      return this.nome;
    }
  
    getEmail() {
      return this.email;
    }
  
    getFuncao() {
      return this.funcao;
    }
  
    getNumero() {
      return this.numero;
    }
  
    getSituacao() {
      return this.situacao;
    }
  }
  