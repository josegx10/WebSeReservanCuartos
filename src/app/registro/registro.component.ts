import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';
import { User } from '../Model/User.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @Output() acceso = new EventEmitter<number>();
  Registro: FormGroup;
  Datos!: FormData;
  constructor(private conexion: ConexionService, private toast: ToastrService) {
    this.Registro = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      pass: new FormControl('',Validators.required),
      ape: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      telefono: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required)
    });
  }


  ngOnInit(): void {
  }
  CrearUsuario(){
    console.log(this.Registro);
    if(this.Registro.value.telefono != '' &&  this.Registro.value.email != '' && this.Registro.value.pass != '' && this.Registro.value.ape != '' && this.Registro.value.name != '' && this.Registro.value.date != ''){
      this.conexion.NewUser(new User(this.Registro.value.telefono, this.Registro.value.email, this.Registro.value.pass, this.Registro.value.ape,this.Registro.value.name, this.Registro.value.date, false, false)).subscribe(Respuesta => {
        if(Respuesta.id != undefined){
          console.log(Respuesta);
          localStorage.setItem('Id', Respuesta.id);
          this.conexion.Anfitrion().subscribe();
          this.acceso.emit(parseInt(`${localStorage.getItem('Acceso')}`));
          this.toast.success('Registro Exitoso');
        }else{
          this.toast.error(Respuesta, 'Error');
        }
      } );
    }else {
      this.toast.error('Te falta ingresar uno o mas datos para el registro', 'ErrorRegistro');
    }
  }
  Salir(){
    this.acceso.emit(parseInt(`${localStorage.getItem('Acceso')}`));
  }
}
