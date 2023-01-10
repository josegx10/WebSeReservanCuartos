export class Lugar{
  idUsuario: any;
  ubicacion: string;
  TipoLugar: string;
  TipoDesc: string;
  TipoEsp: string;
  Calle: string;
  opcion: string;
  Ciudad: string;
  Estado: string;
  cp: string;
  Pais: string;
  Nhuesped: number;
  Nbanios: number;
  NCamas: number;
  Description: string;
  Titulo: string;
  Dinero: number;
  enable: boolean;
  constructor(
    idUsuario: any,
  ubicacion: string,
  TipoLugar: string,
  TipoDesc: string,
  TipoEsp: string,
  Calle: string,
  opcion: string,
  Ciudad: string,
  Estado: string,
  cp: string,
  Pais: string,
  Nhuesped: number,
  Nbanios: number,
  NCamas: number,
  Description: string,
  Titulo: string,
  Dinero: number,
  enable: boolean
  ){
    this.idUsuario = idUsuario;
    this.ubicacion = ubicacion;
    this.TipoLugar = TipoLugar;
    this.TipoDesc = TipoDesc;
    this.TipoEsp = TipoEsp;
    this.Calle = Calle;
    this.opcion = opcion;
    this.Ciudad = Ciudad;
    this.Estado = Estado;
    this.cp = cp;
    this.Pais = Pais;
    this.Nhuesped = Nhuesped;
    this.Nbanios = Nbanios;
    this.NCamas = NCamas;
    this.Description = Description;
    this.Titulo = Titulo;
    this.Dinero = Dinero;
    this.enable = enable;
  }
}
