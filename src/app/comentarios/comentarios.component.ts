import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';
import { Comentario } from '../Model/Comentario.model';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
  Editar = 0;
  Comentarios : any = [];
  id = localStorage.getItem('Id');
  constructor( private conexion: ConexionService, private toast: ToastrService) { }
  @Output() acceso = new EventEmitter<number>();
  ngOnInit(): void {
    this.VerComentarios();
  }
  comentario = new FormControl('');
  usuario: any = [];
  reserva: any = [];
  lugares: any = [];

  CambiarAcceso($event : any){
    this.acceso.emit($event);
    return false;
  }

  CambioEditar(num : number){
    this.Editar = num;
    return false;
  }
  VerComentarios(){
    this.conexion.VerGeneral(8,this.id).subscribe(Respuesta => this.Comentarios = Respuesta);
    this.conexion.VerReserva().subscribe(Respuesta => this.reserva = Respuesta);
    this.conexion.capturarLugares().subscribe(Respuesta => this.lugares = Respuesta);
    this.conexion.AllUser().subscribe(Respuesta => this.usuario = Respuesta);
  }
  crearComentario(idLugar: any){
    if(this.comentario.value != ''){
      this.conexion.VerGeneral(8,this.id).subscribe(Respuesta => this.Comentarios = Respuesta);
      this.conexion.CargarComentario(new Comentario(idLugar, localStorage.getItem('Id'), this.comentario.value)).subscribe(Respuesta => {
        this.Comentarios.push(Respuesta[0]);
        console.log(Respuesta);  
      });
      this.Editar = 0;
      this.mostrar = false;
      this.comentario.setValue('');
      this.toast.success('Se agregado el comentario', 'Comentario ingresado');
    }else {
      this.toast.error('No a ingresado un comentario', 'Falta ingresar el comentario');
    }
  }
  mostrar = false;
  ver(){
    this.conexion.VerGeneral(8,this.id).subscribe(Respuesta => this.Comentarios = Respuesta);
    this.mostrar = !this.mostrar;
  }
}
