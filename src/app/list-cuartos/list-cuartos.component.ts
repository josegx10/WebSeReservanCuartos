import { CommaExpr } from '@angular/compiler';
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
    this.conexion.CapturarNotificacion(new Notificationes(localStorage.getItem('Id'), 'Haz eliminado tu cuarto')).subscribe(Respuesta => {});
    this.conexion.VerReserva().subscribe(Respuesta => {
      
      for(let r of Respuesta){
        if(r.idLugar == id){
          
          this.conexion.UserIndividual(localStorage.getItem('Id')).subscribe(Res => {
            this.conexion.CapturarNotificacion(new Notificationes(r.idUsuario, `El anfitrion ${Res[0].email} ha eliminado un cuarto que ya estabas registrado`)).subscribe(Respuesta => {});
            this.conexion.LugarIndividual(id).subscribe(Responde => {
              this.socket.emitEvent({
                name: 'EliminarCuarto',
                id: r.idUsuario, 
                nombre: Res[0].email
               });
            })
          })
           
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
