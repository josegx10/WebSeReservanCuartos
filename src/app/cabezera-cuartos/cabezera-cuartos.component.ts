import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../conexion.service';
@Component({
  selector: 'app-cabezera-cuartos',
  templateUrl: './cabezera-cuartos.component.html',
  styleUrls: ['./cabezera-cuartos.component.css']
})
export class CabezeraCuartosComponent {
  SerAnfitrion : any;

  CP = new FormControl('');
  fechaI = new FormControl('');
  fechaF = new FormControl('');
  ParaRefrescar : any = [];
  @Output() acceso = new EventEmitter<number>();
  constructor(private cookie: CookieService, private conexion: ConexionService) { }

  ngOnInit(): void {
    
    
  }

  HacerseAnfitrion(){
    this.acceso.emit(2);
  }
  VolverIndex(){
    this.acceso.emit(1);
    this.cookie.set('acceso', '1')
  }
  HacederCuartos(){
    this.acceso.emit(4);
  }
  CambiarPantalla(num:number){
    this.acceso.emit(num)
  }
  Registrar(){
    this.acceso.emit(8);
  }

  CerrarSesion(){
    if(localStorage.getItem('Id')){
      localStorage.removeItem('Id');
      this.acceso.emit(1);
      /*this.conexion.VerUser().subscribe();*/
    }
  }
  
  Enlace(){
    if(localStorage.getItem('Id')){
    }else {
      this.Registrar();
    }
  }
  CambiarAcceso($event: any){
    this.acceso.emit($event);
  }

  
}
