// UsuarioDTO.js
export default class UsuarioDTO {

    constructor(usuario) {
      this.uid = usuario.getUid();
      this.nome = usuario.getNome();
      this.email = usuario.getEmail();
      this.funcao = usuario.getFuncao();
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
  }
  