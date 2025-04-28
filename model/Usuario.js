export default class Usuario {

  #email;
  #uid;
  #funcao;

  constructor(email, nome, uid, funcao) {
    this.setEmail(email);
    this.setNome(nome);
    this.setUid(uid);
    if(funcao === undefined || funcao === null)
      this.setFuncao("INABILITADO");
    else
      this.setFuncao(funcao)
  }

  getUid() {
    return this.#uid;
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

  setUid(uid) {
    if (!Usuario.validarUid(uid))
      throw new ModelError("UID inválido: " + uid);
    this.#uid = uid;
  }

  setNome(nome) {
    Usuario.validarNome(nome);
    this.nome = nome;
  }

  setEmail(email) {
    Usuario.validarEmail(email);
    this.email = email;
  }

  setFuncao(funcao) {
    Usuario.isFuncaoValida(funcao);
    this.funcao = funcao;
  }

  static validarNome(nome) {
    if (typeof nome !== "string" || nome.trim() === "" || nome.length < 3) {
      throw new ModelError("O nome deve ser uma string não vazia com no mínimo 3 caracteres.");
    }
  }

  static validarUid(uid) {
    return true;
  }

  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !regex.test(email)) {
      throw new ModelError("Digite um e-mail válido.");
    }
  }

  static validarFuncao(funcao) {
    const funcoesValidas = ["ADMIN", "GARCON", "MESA"];
    if (typeof funcao !== "string" || !funcoesValidas.includes(funcao)) {
      throw new ModelError("Função inválida. As opções válidas são: ADMIN, GARCON ou MESA.");
    }
  }

  static isFuncaoValida(funcao) {
    return funcao === "ADMIN" || funcao === "GARCON" || funcao === "MESA";
  }
}
