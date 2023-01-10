import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private conexion: ConexionService) {
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
    this.conexion.NewUser(new User(this.Registro.value.telefono, this.Registro.value.email, this.Registro.value.pass, this.Registro.value.ape,this.Registro.value.name, this.Registro.value.date, false, false)).subscribe(Respuesta => {
      console.log(Respuesta);
      localStorage.setItem('Id', Respuesta.id);
    } );

    this.conexion.Anfitrion().subscribe();
    this.acceso.emit(parseInt(`${localStorage.getItem('Acceso')}`));
  }
  Salir(){
    this.acceso.emit(parseInt(`${localStorage.getItem('Acceso')}`));
  }
}
