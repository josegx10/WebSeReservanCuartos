import { Component, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  accesoMap = 1;
  WindowFiltro=false;
  nada : any;
  vector: any = [];

  constructor(private cookie: CookieService, private conexion: ConexionService) { }
  @Output() acceso = new EventEmitter<number>();

  ngOnInit(): void {
    if(this.cookie.get('Categoria')){

    }else {
      this.cookie.set('Categoria','22');
    }
    localStorage.setItem('Acceso','1');

  }

  CambiarMap() {
    if(this.accesoMap == 1){
      this.accesoMap+=1;
    }else{
      this.accesoMap-=1;
    }
  }
  CambiarAcceso($event: any){
    this.acceso.emit($event);
  }
  AbrirFiltro($event: any){
    this.WindowFiltro = $event;
  }

}
