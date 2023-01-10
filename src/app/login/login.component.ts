import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: FormGroup;
  constructor(private conexion: ConexionService, private toast: ToastrService) {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', Validators.required)
    });
  }
  @Output() acceso = new EventEmitter<number>();
  ngOnInit(): void {

  }
  salir(){
    this.acceso.emit(parseInt(`${localStorage.getItem('Acceso')}`));
  }
  CambiaRegistro(){
    this.acceso.emit(9);
    return false;
  }
  Acceder(){
    this.conexion.VerGeneral(7, this.user.value.email).subscribe(Respuesta => {
      if(Respuesta[0].id == undefined){
        this.toast.error(`${Respuesta}`, 'No esta registrado el usuario')
      }else {
        if(Respuesta[0].password == this.user.value.pass){
          localStorage.setItem('Id', Respuesta[0].id);
          this.toast.success('Acceso Valido','Login Correcto')
          this.acceso.emit(parseInt(`${localStorage.getItem('Acceso')}`));
        }else {
          this.toast.error('La contraseña no existe','La contraseña invalida')
        }
      }
      console.log(Respuesta.password);
      console.log(this.user.value.pass);
    });
  }
}
