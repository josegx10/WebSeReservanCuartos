export  class User {
  numero: string;
  email: string;
  password: string;
  apellido: string;
  nombre: string;
  fecha: string;
  Huesped: boolean;
  Anfitrion: boolean;
  constructor(
    numero: string,
    email: string,
    pass: string,
    apellido: string,
    nombre: string,
    fecha: string,
    Huesped: boolean,
    Anfitrion: boolean
    ){
      this.numero = numero;
      this.email = email;
      this.apellido = apellido;
      this.nombre = nombre;
      this.fecha = fecha;
      this.Huesped = Huesped;
      this.Anfitrion = Anfitrion;
      this.password = pass;
  }


}
