export  class Reserva {
    lugar: any;
    usuario: any;
    periodo: any;
    dinero: any;
    huesped: number;
    constructor(
        lugar: any,
        usuario: any,
        periodo: any,
        dinero: any,
        huesped: number,
      ){
        this.lugar = lugar;
        this.usuario = usuario;
        this.periodo = periodo;
        this.dinero = dinero;
        this.huesped = huesped;
    }
  
  
}