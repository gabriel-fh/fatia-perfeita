class Usuario {
  constructor(nome, email, funcao) {
    this.nome = nome;
    this.email = email;
    this.funcao = funcao;
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
