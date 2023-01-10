import { Component, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent {
  categoria: any = [];
  constructor(private conexion: ConexionService, private cookie: CookieService) { }
  @Output() WindowFiltro = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.CargarIcon();
  }
  AbrirFiltro(){
    this.WindowFiltro.emit(true);
  }
  CargarIcon (){
    this.conexion.obtenerIcon().subscribe(Respuesta => this.categoria = Respuesta  );

  }

  VerCategoria(num: any){
    this.cookie.set('Categoria',num);
    this.conexion.VerUser().subscribe(Respuesta => {});
  }
}
