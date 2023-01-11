
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{
  
  @Output() callback: EventEmitter<any> = new EventEmitter();
  constructor(private cookie: CookieService, private tost: ToastrService) { 
    super({
      url: 'https://socketsereservacuartos.herokuapp.com/',
      //url: 'http://localhost:5000',
      options: {
        query: {
          nombre: localStorage.getItem('Socket')
        }
      }
    })
    this.ioSocket.on('event', (res: any) => this.callback.emit(res) )
  }
  emitEvent = (payload = {}) => {
    this.ioSocket.emit('event', payload);
  }
}
