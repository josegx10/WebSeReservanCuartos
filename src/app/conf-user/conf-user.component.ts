import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';
import { User } from '../Model/User.model';

@Component({
  selector: 'app-conf-user',
  templateUrl: './conf-user.component.html',
  styleUrls: ['./conf-user.component.css']
})
export class ConfUserComponent {
  Editar = 0;
  info: FormGroup;
  Reserva: any = [];
  Lugares: any = [];
  usuarios : any= [];
  verNotificacion = false;
  constructor(private conexion: ConexionService, private cookie: CookieService, private toast: ToastrService) {
      this.info = new FormGroup({
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        numero: new FormControl('', Validators.required),
        fecha: new FormControl('', Validators.required),
        contraseña: new FormControl(''),
        confirmarcontraseña: new FormControl(''),
        passAnterior: new FormControl('')
      })
   }
  user: any = [];
  id = localStorage.getItem('Id');
  @Output() acceso = new EventEmitter<number>();
  ngOnInit(): void {
    this.AgregarInfo();
  }
  CambiarAcceso($event : any){
    this.acceso.emit($event);
    return false;
  }
  Cambiar(num: number){
    this.acceso.emit(num);
  }
 
  CambiarEditar(num: number){
    this.Editar = num;
    return false;
  }
  AgregarInfo(){
    this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
    this.conexion.VerReserva().subscribe(Respuesta => {this.Reserva = Respuesta;});
    this.conexion.capturarLugares().subscribe(Respuesta => {this.Lugares = Respuesta;});
    this.conexion.AllUser().subscribe(Respuesta => {this.usuarios = Respuesta;});
  }
  ModificarUser(nombre: any, apellido: any, numero: any, email:any , fecha: any, num: number, Huesped: any, Anfitrion: any, pass: string){
    if(num == 1){
      this.conexion.ModificarUser(this.id, new User(numero,email,pass,apellido,this.info.value.nombre,fecha,Huesped,Anfitrion)).subscribe(Respuesta => {this.user = Respuesta;});
      this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
      this.info.controls['nombre'].setValue('');
      this.Editar = 0;
    }else if(num == 2){
      this.conexion.ModificarUser(this.id, new User(numero,email,pass,this.info.value.apellido,nombre,fecha,Huesped,Anfitrion)).subscribe(Respuesta => {this.user = Respuesta;});
      this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
      this.info.controls['apellido'].setValue('');
      this.Editar = 0;
    }else if(num == 3){
      this.conexion.ModificarUser(this.id, new User(this.info.value.numero,email,pass,apellido,nombre,fecha,Huesped,Anfitrion)).subscribe(Respuesta => {this.user = Respuesta;});
      this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
      this.info.controls['numero'].setValue('');
      this.Editar = 0;
    }else if(num == 4){
      this.conexion.ModificarUser(this.id, new User(numero,this.info.value.email,pass,apellido, nombre,fecha,Huesped,Anfitrion)).subscribe(Respuesta => {this.user = Respuesta;});
      this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
      this.info.controls['email'].setValue('');
      this.Editar = 0;
    }else if(num == 5){
      this.conexion.ModificarUser(this.id, new User(numero,email,pass ,apellido,nombre,this.info.value.fecha,Huesped,Anfitrion)).subscribe(Respuesta => {this.user = Respuesta;});
      this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
      this.info.controls['fecha'].setValue('');
      this.Editar = 0;
    }else if(num == 6){
      if(pass == this.info.value.passAnterior){
        if(this.info.value.confirmarcontraseña == this.info.value.contraseña){
          this.conexion.ModificarUser(this.id, new User(numero,email,this.info.value.contraseña ,apellido,nombre, fecha,Huesped,Anfitrion)).subscribe(Respuesta => {this.user = Respuesta;});
          this.conexion.InfoUser(this.id).subscribe(Respuesta => {this.user = Respuesta;});
          this.info.controls['confirmarcontraseña'].setValue('')
          this.info.controls['passAnterior'].setValue('')
          this.info.controls['contraseña'].setValue('')
          this.Editar = 0;
        }else {
          this.toast.error('No coincide la verificacion', 'Error Contraseña')
        }
      }else {
        this.toast.error('No es la contraseña del usuario', 'Error Contraseña')
      }
    }else {
      console.log('la opcion no exste');
    }
  }
  CerrarSecion(){
    if(localStorage.getItem('Id')){
      localStorage.removeItem('Id');
      this.acceso.emit(1);
    }
  }
  AbrirNotificacion(){
    this.verNotificacion = true;
  }
  CambiarNotificacion($event: any){
    this.verNotificacion = $event;
  }
}
