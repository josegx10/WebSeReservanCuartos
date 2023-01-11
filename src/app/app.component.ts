import { CommaExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from './conexion.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeReservanCuartos';
  acceso = 1;
  
  constructor(private socket: SocketService, private toast: ToastrService, private cookie: CookieService, private conexion: ConexionService){
    conexion.FinalizarPeriodo().subscribe(Respuesta => {})
    cookie.set('acceso', '1');
    localStorage.setItem('Socket','SeReservanCuartos')
    socket.callback.subscribe(res => {
      if(res.name == 'AccederACuarto'){
        if(res.id == localStorage.getItem('Id')){
          conexion.LugarIndividual(res.id_lugar).subscribe(Respuesta => {
            toast.success(`Tienes un nuevo Huesped del cuarto ${Respuesta.Titulo}`, 'Tienes nuevo huesped');
          })
        
        }
      }else if(res.name == 'EliminarCuarto') {
        if(res.id == localStorage.getItem('Id')){
          
          toast.warning(`El anfitrion ${res.nombre} ha eliminado el cuarto que ya estas registrado`, 'Han eliminado un cuarto');
          
        
        }
      }
    })
  }
  CambiarAcceso($event: any){
    this.acceso = $event;
    return false;
  }
}
