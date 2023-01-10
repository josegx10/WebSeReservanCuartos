import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styleUrls: ['./cabezera.component.css']
})
export class CabezeraComponent {
  SerAnfitrion : any;
  logearse = 0;
  CP = new FormControl('');
  fechaI = new FormControl('');
  fechaF = new FormControl('');
  ParaRefrescar : any = [];
  acceso2 = this.cookie.get('acceso');
  @Output() acceso = new EventEmitter<number>();
  constructor(private cookie: CookieService, private conexion: ConexionService) { }

  ngOnInit(): void {
    this.Anfitrion();
    
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
  Registro($event: any){
    this.logearse = $event;
  }
  CerrarSesion(){
    if(localStorage.getItem('Id')){
      localStorage.removeItem('Id');
      this.acceso.emit(1);
      /*this.conexion.VerUser().subscribe();*/
    }
  }
  Anfitrion(){
    if(localStorage.getItem('Id')){
      this.SerAnfitrion = true;
      this.ParaRefrescar[0] = 'Modo Anfitrion';
    }else{
      this.SerAnfitrion = false;
      this.ParaRefrescar[0] = 'Ya registrate';
    }

  }
  Enlace(){
    if(localStorage.getItem('Id')){
      this.CambiarPantalla(6);
      this.cookie.set('acceso','2')
    }else {
      this.Registrar();
    }
  }
  CambiarAcceso($event: any){
    this.acceso.emit($event);
  }

  Busqueda(){
    this.cookie.set('CP',`${this.CP.value}`);
    /*if(`${this.fechaF.value}` >= `${this.fechaI.value}` ){
      this.cookie.set('fechaI', `${this.fechaI.value}`);
      this.cookie.set('fechaF',`${this.fechaF.value}`);
    }else {
      alert('No se puede mandar una fecha inicial mayor');
    }*/
    this.cookie.set('fechaI', `${this.fechaI.value}`);
    this.cookie.set('fechaF',`${this.fechaF.value}`);
    this.cookie.set('Categoria','24');
    this.conexion.VerUser().subscribe(Respuesta => {});
  }
}
