import { splitNsName } from '@angular/compiler';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit{
  notifica : any = [];
  id= localStorage.getItem('Id');
  @Output() verNotificacion = new EventEmitter<boolean>();
  quitar(){
    this.verNotificacion.emit(false);
  }
  constructor(private conexion: ConexionService){

  }
  ngOnInit(): void {
    this.conexion.VerNotificaciones(this.id).subscribe(Respuesta => {this.notifica = Respuesta;});
  }

  dejarFecha(data: any) {
    return data.split('T')[0]
  }
  
}
