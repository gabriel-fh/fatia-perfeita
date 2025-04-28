// GarcomDTO.js
export default class GarcomDTO {

    constructor(garcom) {
      this.nome = garcom.getNome();
      this.email = garcom.getEmail();
      this.matricula = garcom.getMatricula();
      this.horaInicio = garcom.getHoraInicio();
      this.horaFim = garcom.getHoraFim();
      this.situacao = garcom.getSituacao();
    }
  
    getNome() {
      return this.nome;
    }
  
    getEmail() {
      return this.email;
    }
  
    getMatricula() {
      return this.matricula;
    }
  
    getHoraInicio() {
      return this.horaInicio;
    }
  
    getHoraFim() {
      return this.horaFim;
    }
  
    getSituacao() {
      return this.situacao;
    }
  }
  