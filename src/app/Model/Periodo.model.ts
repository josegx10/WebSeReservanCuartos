export  class Periodo {
    
    idUsuario: number
    idLugar: number
    fecha: string
    dias: string
    enable: boolean
    constructor(
        idUsuario: number,
        idLugar: number,
        fecha: string,
        dias: string,
        enable: boolean){
        this.idUsuario = idUsuario;
        this.idLugar = idLugar;
        this.fecha = fecha;
        this.dias = dias;
        this.enable = enable
    }
  
  
  }