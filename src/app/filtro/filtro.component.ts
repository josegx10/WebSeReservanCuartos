import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent {
  checkDescri = ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'];
  checkD = [false, false, false, false, false, false, false, false];
  minimo = new FormControl('');
  maximo = new FormControl('');
  huesped = new FormControl('');
  banios = new FormControl('');
  camas= new FormControl('');
  constructor(private cookie: CookieService, private conexion: ConexionService) { }
  @Output() WindowFiltro = new EventEmitter<boolean>();
  ngOnInit(): void {
  }
  Cerrar(){
    console.log(this.minimo.value);
    this.WindowFiltro.emit(false);
  }
  filtrar(){
    if(this.checkD[0]){ this.cookie.set('Descripcion0', 'Residencia') } else { this.cookie.delete('Descripcion0') }
    if(this.checkD[1]){ this.cookie.set('Descripcion1', 'Cabaña') } else { this.cookie.delete('Descripcion1') }
    if(this.checkD[2]){ this.cookie.set('Descripcion2', 'Villa') } else { this.cookie.delete('Descripcion2') }
    if(this.checkD[3]){ this.cookie.set('Descripcion3', 'Casa adosada') } else { this.cookie.delete('Descripcion3') }
    if(this.checkD[4]){ this.cookie.set('Descripcion4', 'Casa de Campo') } else { this.cookie.delete('Descripcion4') }
    if(this.checkD[5]){ this.cookie.set('Descripcion5', 'Un alojamiento entero') } else { this.cookie.delete('Descripcion5') }
    if(this.checkD[6]){ this.cookie.set('Descripcion6', 'Una habitación privada') } else { this.cookie.delete('Descripcion6') }
    if(this.checkD[7]){ this.cookie.set('Descripcion7', 'Una habitación compartida') } else { this.cookie.delete('Descripcion7') }
    this.cookie.set('minimo', `${this.minimo.value}`);
    this.cookie.set('maximo', `${this.maximo.value}`);
    this.cookie.set('huesped',`${this.huesped.value}`);
    this.cookie.set('banios',`${this.banios.value}`);
    this.cookie.set('camas',`${this.camas.value}`);
    this.cookie.set('Categoria','23');
    this.conexion.VerUser().subscribe(Respuesta => {});
    this.WindowFiltro.emit(false);
  }
  check(id: any){
    if(this.checkDescri[id] == 'white'){
      this.checkDescri[id] = '#2b97fa';
      this.checkD[id] = true;
    }else {
      this.checkDescri[id] = 'white';
      this.checkD[id] = false;
    }
  }
}
