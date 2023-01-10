import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {
  title = 'SeReservanCuartos';
  acceso = 1;
  
  constructor(private socket: SocketService, private toast: ToastrService, private cookie: CookieService){
    cookie.set('acceso', '1');
    localStorage.setItem('Socket','SeReservanCuartos')
    socket.callback.subscribe(res => {
      if(res.id == localStorage.getItem('Id')){
        toast.success(`El usuario ${res.id_usuario} del cuarto ${res.id_lugar}`, 'Titulo del Ejemplo');
      }
    })
  }
  CambiarAcceso($event: any){
    this.acceso = $event;
    return false;
  }
}
