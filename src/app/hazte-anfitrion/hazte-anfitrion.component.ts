import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConexionService } from '../conexion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Lugar } from '../Model/Lugar.model';
import { CookieService } from 'ngx-cookie-service';
import { LugarCategorias } from '../Model/LC.model';
import { Map, marker, tileLayer } from 'leaflet'; 
import { ExtrasService } from '../extras.service';

@Component({
  selector: 'app-hazte-anfitrion',
  templateUrl: './hazte-anfitrion.component.html',
  styleUrls: ['./hazte-anfitrion.component.css']
})
export class HazteAnfitrionComponent {
  calles : FormGroup;
  ciudad: any;
  lugares: any = [];
  Icon: any = [];
  direccion : FormGroup;
  titulo:   FormGroup;
  description: FormGroup;
  public archivo : any = [];
  previsualizacion: string[] = [];
  selectFile!: File ;
  NombreUser: any= [];
  precio : FormGroup;
  id = localStorage.getItem('Id');
  cont = 1;
  constructor(private conexion: ConexionService, private sanitizer: DomSanitizer, private cookie: CookieService, private extras: ExtrasService) {
    this.direccion = new FormGroup({
      estado: new FormControl('', Validators.required),
      cp: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      coordenadas: new FormControl('', Validators.required)
    });
    this.titulo = new FormGroup({
      tit: new FormControl('', Validators.required)
    });
    this.description = new FormGroup({
      descripcion: new FormControl('',Validators.required)
    });
    this.precio = new FormGroup({
      dinero: new FormControl('',Validators.required)
    });
    this.NameUser();
    this.calles=new FormGroup({
      calle: new FormControl('')
    })
  }
  ngAfterViewInit(){
    
    if(!navigator.geolocation){
      alert("Navegador no soporta la geolocalizacion");
      throw new Error("Navegador no soporta la geolocalizacion");
    }
    navigator.geolocation.getCurrentPosition(async (position) => {

      await this.crearMapa(position);
      

    });
    
  }
  @Output() acceso = new EventEmitter<number>();
  cambio = 1;
  tipoLugar: any;
  tipoDescripcion: any;
  tipoEspa: any;
  NCamas: number = 1;
  NHuespedes: number =1;
  NBanios: number = 1;
  bloquear: boolean = true;
  checkTipoLugar = ['white', 'white','white', 'white', 'white', 'white'];
  checkTipoDescripcion = ['white','white', 'white' , 'white' ,'white'];
  checkTipoEspa = ['white','white','white'];
  checkAspectos = ['white','white','white','white','white','white',
  'white','white','white', 'white','white','white', 'white','white','white'];
  AspectosServicios = [false, false, false,false, false, false, false, false, false,
    false, false, false,false, false, false];
  ngOnInit(): void {
    this.obtenerIcon();
  }
  VolverIndex(){
    this.acceso.emit(1);
  }
  VolvelList(){
    this.acceso.emit(4);
  }
  cambiarSiguiente(){
    this.cambio+=1;
    this.bloquear = true;
    this.ngAfterViewInit()
    
  }
  cambiarAtras(){
    this.cambio-=1;
    this.ngAfterViewInit()
  }
  obtenerIcon(){
    this.conexion.obtenerIcon().subscribe(Respuesta => this.Icon = Respuesta);
  }
  SeleccionarButton(palabra: any, tipo: number, id: number){
    if(tipo == 1){
      this.checkTipoLugar.fill('white');
      this.checkTipoLugar[id - 15] = '#2b97fa';
      console.log('Es un tipo de Alojamiento');
      this.tipoLugar = palabra;
      this.bloquear = false;
    }else if(tipo == 2){
      this.checkTipoDescripcion.fill('white');
      this.checkTipoDescripcion[id] = '#2b97fa';
      console.log('Es un tipo de descripcion del Alojamiento');
      this.tipoDescripcion = palabra;
      this.bloquear = false;
    }else if(tipo == 3){
      this.checkTipoEspa.fill('white');
      this.checkTipoEspa[id] = '#2b97fa';
      console.log('Es un tipo de espacio');
      this.tipoEspa = palabra;
      this.bloquear = false;
    }

  }
  AumentarNumero(tipo: number){
    if(tipo == 1){
      this.NHuespedes+=1;
    }else if(tipo == 2){
      this.NCamas+=1;
    }else if(tipo == 3){
      this.NBanios+=1;
    }
  }
  BajarNumero(tipo: number){
    if(tipo == 1){
      if(this.NHuespedes != 1){
        this.NHuespedes-=1;
      }
    }else if(tipo == 2){
      if (this.NCamas!=1) {
        this.NCamas-=1;
      }
    }else if(tipo == 3){
      if (this.NBanios!=1) {
        this.NBanios-=1;
      }
    }
  }
  cambiarSiguienteD(){
    console.log(this.direccion);
    if(this.direccion.status == "VALID"){
      this.cambio+=1;
    }
  }
  cambiarSiguienteT(){
    console.log(this.direccion);
    if(this.titulo.status == "VALID"){
      this.cambio+=1;
    }
  }
  cambiarSiguienteDes(){
    console.log(this.direccion);
    if(this.description.status == "VALID"){
      this.cambio+=1;
    }
  }
  cambiarSiguienteP(){
    console.log(this.direccion);
    if(this.precio.status == "VALID"){
      this.cambio+=1;
    }
  }
  capturarFile($event : any): void {
    this.selectFile=$event.target.files[0];
    const archivoCap = $event.target.files[0];
    this.extraerBase64(archivoCap).then((imagen : any) => {
      this.previsualizacion.push( imagen.base);

      console.log(imagen);
    });

    this.archivo.push( $event.target.files[0]);
    console.log($event.target.files);
    this.bloquear = false;
  }
  extraerBase64 = async ($event : any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {

        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {

        resolve({
          base: null
        });
      };
      return reader;
    } catch(e) {
      return null;
    }
  });
  NameUser(){

    this.conexion.UserIndividual(this.id).subscribe(Respuesta => {
      this.NombreUser = Respuesta;
      console.log(Respuesta);
      console.log(this.id);
    });
  }
  GuardarAlojamiento(){
    console.log(this.calles.value.calle);
    console.log(this.direccion.value.coordenadas);
    console.log(this.ciudad)
   this.conexion.newLugar(new Lugar(this.id, this.direccion.value.coordenadas, this.tipoLugar, this.tipoDescripcion, this.tipoEspa, this.calles.value.calle, "OPCION", this.ciudad, this.direccion.value.estado, this.direccion.value.cp, this.direccion.value.pais, this.NHuespedes, this.NBanios, this.NCamas, this.description.value.descripcion, this.titulo.value.tit, this.precio.value.dinero, true)).subscribe(Respuesta => {
    this.cookie.set('Cuarto', Respuesta.id);
    for(let dato of this.archivo){
      this.conexion.CargarImagenes(dato, Respuesta.id ).subscribe(Respuesta => {});
    }
    for(let data of this.AspectosServicios){
      if(data){
        this.conexion.CategoriasLugar(new LugarCategorias(this.cont, Respuesta.id)).subscribe(Respuesta => {console.log(Respuesta)});
      }
      this.cont+=1;
    }
   });


   this.acceso.emit(4);
  }
  ServicioAspectos(id : any){
    if(this.AspectosServicios[id - 1]){
      this.AspectosServicios[id - 1] = false;
      this.checkAspectos[id-1] = 'white';
    }else {
      this.AspectosServicios[id - 1] = true;
      this.checkAspectos[id-1] = '#2b97fa';
    }
  }
  crearMapa(coor: any){
    if( this.cambio== 4){
      const map= new Map('map').setView([coor.coords.latitude, coor.coords.longitude], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); 
    
    this.direccion.controls['coordenadas'].setValue(coor.coords.latitude + ', ' + coor.coords.longitude);

    const markerubi =  marker([coor.coords.latitude, coor.coords.longitude], {
      draggable : true
    }).addTo(map);
    markerubi.on("move", () => {
      const coordenadas = markerubi.getLatLng();
      this.direccion.controls['coordenadas'].setValue(coordenadas.lat + ', ' + coordenadas.lng);
      
    });
    }
  }
  EncontrarCP(){
    this.extras.ApiCp(this.direccion.value.cp).subscribe(Respuesta => {
      console.log(Respuesta);
      if(Respuesta.estatus == 'si'){
        this.direccion.controls['estado'].setValue(Respuesta.data.estado);
        this.direccion.controls['pais'].setValue('Mexico');
        for(let s of Respuesta.data.asentamientos){
          this.lugares.push(s.nombre);
        }
      }else{
        this.direccion.controls['estado'].setValue('');
        this.direccion.controls['pais'].setValue('');
        this.lugares = [];
        alert("El codigo postal no esta registrado o no existe");
      }
    })
  }
  accion(){
    console.log(this.ciudad)
  }
}
