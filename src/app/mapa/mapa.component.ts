import { Component, OnInit , AfterViewInit, Output, EventEmitter} from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  @Output() acceso = new EventEmitter<number>();
  constructor(private conexion : ConexionService, private cookie : CookieService) { }
  Lugares : any = [];
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    if(!navigator.geolocation){
      alert("Navegador no soporta la geolocalizacion");
      throw new Error("Navegador no soporta la geolocalizacion");
    }
    navigator.geolocation.getCurrentPosition(async (position) => {

      await this.crearMapa(position);
      

    });
    

  }
  crearMapa(coor: any){
    const map= new Map('mapa').setView([coor.coords.latitude, coor.coords.longitude], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); 
    this.conexion.capturarLugares().subscribe(Respuesta => {
      this.Lugares = Respuesta;

      for(let elemento of this.Lugares){
        console.log(elemento.id);
        const lng = elemento.ubicacion.split(',',2);
        console.log(lng);
        if(elemento.fechaF!==undefined && elemento.enable == 1 && localStorage.getItem('Id') != elemento.id_usuario){
          marker([ parseFloat(lng[0]),parseFloat(lng[1])]).addTo(map).bindPopup(`
          <a href="/#/${elemento.id}" target="_blank">
            <img src="https://sheltered-stream-77543.herokuapp.com${elemento.imagen}" alt="" >
            <h2>${elemento.Ciudad}, ${elemento.Estado}</h2>
            <h2>$${elemento.fechaI} - ${elemento.fechaF}</h2>
            <h2>$${elemento.Dinero}</h2>
            
          </a>

        `);
        }
        
      }
    });
  }
}
