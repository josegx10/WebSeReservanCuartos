import { Component, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';
import { Notificationes } from '../Model/Notificaciones.model';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-list-cuartos',
  templateUrl: './list-cuartos.component.html',
  styleUrls: ['./list-cuartos.component.css']
})
export class ListCuartosComponent {
  @Output() acceso = new EventEmitter<number>();
  cuartos: any = [];
  Image: any = [];
  constructor(private conexion: ConexionService, private cookie: CookieService, private socket: SocketService, private toast: ToastrService) { }
  id = localStorage.getItem('Id');
  ngOnInit(): void {
    this.Cuartos();
  }
  CambiarAcceso($event: any){
    this.acceso.emit($event);
  }
  AbrirCuartos(id: any){
    this.cookie.set('Cuarto', id);
    this.acceso.emit(5);
  }
  Cuartos(){
    this.conexion.VerGeneral(4,this.id).subscribe(Respuesta => this.cuartos = Respuesta);
    this.conexion.VerGeneral(1,1).subscribe(Respuesta => this.Image = Respuesta);
  }
  VerInfo($event : any){
    this.acceso.emit(2);
  }
  EliminarCuarto(id: any){
    this.conexion.CapturarNotificacion(new Notificationes(this.id, 'Haz eliminado tu cuarto')).subscribe(Respuesta => {});
    this.conexion.verComentariosLugar(id, 0).subscribe(Respuesta => {
      var dato = 0;
      for(let r of Respuesta){
        if(r.id_usuario != dato){
          dato = r.id_usuario;
          this.conexion.CapturarNotificacion(new Notificationes(r.id_usuario, `Han eliminado un cuarto que ya estaba registrado`)).subscribe(Respuesta => {});
          this.socket.emitEvent({
            name: 'EliminarCuarto',
            id: localStorage.getItem('Id'), 
            id_lugar: id,
            id_usuario: r.id_usuario
           }); 
        }
      }
    });
    this.toast.success('Se a eliminado tu cuarto', 'Cuarto Eliminado');
    this.conexion.EliminarLugar(id).subscribe(Respuesta => {});
    this.conexion.VerGeneral(4,this.id).subscribe(Respuesta => this.cuartos = Respuesta);
    this.Reserva = false;
  }
  Reserva = false;
  Reservar(){
    this.conexion.VerGeneral(4,this.id).subscribe(Respuesta => this.cuartos = Respuesta);
    this.Reserva = !this.Reserva
  }
}
