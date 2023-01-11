import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';
import { Notificationes } from '../Model/Notificaciones.model';
import { Periodo } from '../Model/Periodo.model';
import { Reserva } from '../Model/Reserva.Model';
import { SocketService } from '../socket.service';
import { NavigationEnd, Router, Event } from '@angular/router'

@Component({
  selector: 'app-info-cuartos',
  templateUrl: './info-cuartos.component.html',
  styleUrls: ['./info-cuartos.component.css']
})
export class InfoCuartosComponent implements OnInit {
  vista = false;
  Lugar: any = [];
  id: any;
  @Output() acceso = new EventEmitter<number>();
  periodo: any = [];
  dato: any;
  Image: any = [];
  huesped = new FormControl('');
  Cate: any = [];
  fechas: any;
  comentarios: any = [];
  usuario: any=[];
  validar = false;
  constructor(private socket: SocketService, private conexion: ConexionService, private cookie: CookieService, private toast: ToastrService, private router: Router){
    
  }
  Reservar(id_lugar: any, id: any, dinero: any, titulo: any, numero: any){
    console.log(this.fechas);
    console.log(this.huesped.value)
    if(localStorage.getItem('Id')){
      if(parseInt(`${this.huesped.value}` )<= 0 || numero < parseInt(`${this.huesped.value}` )){
        this.toast.error('El numero de huesped es menor de 1 o es mayor al numero maximo','Error');
      } else if(this.fechas != null && this.huesped.value != '') {
        this.conexion.PeriodoGetAll().subscribe(Res => {
          this.conexion.VerReserva().subscribe(Respuestas => {
          var verificar = true;
          console.log(Res);
          console.log(this.fechas-1);
          var identificador= 0;
          for(let i=0; i < Res.length; i++){
            if( Res[i].id == this.fechas ){
              identificador = i;
              break;
            }
          }
          for(let r of Respuestas){
            if(localStorage.getItem('Id') == r.idUsuario ){
              for(let res of Res ){
                if(res.id == r.idPeriodo){
                  if((Res[identificador].fInicial <= res.fFinal && Res[identificador].fInicial >= res.fInicial) || ( Res[identificador].fFinal <= res.fFinal && Res[identificador].fFinal >= res.fInicial )){
                    verificar = false;
                  }else {
                    
                  }
                }
              }
              
            }
          }
          if(verificar == true){
            this.conexion.InfoUser(localStorage.getItem('Id')).subscribe(Respuesta => {
              this.conexion.CapturarNotificacion(new Notificationes(id, ` Tiene un nuevo huesped: ${Respuesta[0].email}`)).subscribe(Respuesta =>{});
            })
            this.socket.emitEvent({
              name: 'AccederACuarto',
              id: id, 
              id_lugar: id_lugar,
              id_usuario: localStorage.getItem('Id')
             }); 
            this.toast.success(`Te haz hecho huesped de ${titulo}`,'Ya eres Huesped');
            this.conexion.CapturarNotificacion(new Notificationes(localStorage.getItem('Id'), ` Te haz hecho huesped de ${titulo}`)).subscribe(Respuesta =>{});
            this.conexion.CapturarReserva(new Reserva(this.id, localStorage.getItem('Id'),this.fechas,dinero,parseInt(`${this.huesped.value}`))).subscribe(Respuesta => {console.log(Respuesta)})
            this.conexion.VerPeriodo(id_lugar).subscribe(Respuesta =>{
              for(let r of Respuesta){
                if(r.id == this.fechas){
                  this.conexion.ActualizarPeriodo(r.id,new Periodo( r.id_usuario,r.id_lugar,r.fInicial, r.fFinal, false)).subscribe(Respuesta => {})
                }
              }
            })
            this.acceso.emit(1);  
            this.validar = true;
          }else {
            this.toast.error('Uno de los dias entra en un periodo ya registrado')
          }
        })
        })
      }else if(this.fechas == null && this.huesped.value == '') {
        this.toast.error('Falta Registrar la informacion: el periodo y los huespedes', 'Error')
        
      } else {
        this.toast.error('Falta poner uno de los datos: el periodo o el numero de huespedes', 'Error')
      }
    }else {
      this.toast.error('No estas registrado en la página','Falta suscribirse');
    }
  }
  ngOnInit(): void {
    this.id = (this.router.url).split('/')[1];
    this.AccederLugar();
    this.ImageLugar();
    this.CategoriaLugar();
    localStorage.setItem('Acceso','3');
  }
  CambiarAcceso($event: any){
    this.acceso.emit($event);
  }
  ImageLugar(){
    this.conexion.VerGeneral(2,this.id).subscribe(Respuesta => this.Image = Respuesta);
  }
  AccederLugar(){
    this.conexion.LugarIndividual(this.id).subscribe((Respuesta: any[]) => {
      this.Lugar = Respuesta
      if(localStorage.getItem('Id') == Respuesta[0].id_usuario){
        window.location.href="http://localhost:4200";
      }
    });
    this.conexion.VerPeriodo(this.id).subscribe(Respuesta => this.periodo = Respuesta);
    this.conexion.verComentariosLugar(this.id, 0).subscribe(Respuesta => this.comentarios = Respuesta);
    this.conexion.AllUser().subscribe(Respuesta => this.usuario = Respuesta);
  }
  Del(dta: any){
    this.Lugar = dta;
    console.log(this.Lugar);

  }
  CategoriaLugar(){
    this.conexion.VerGeneral(3,this.id).subscribe(Respuesta => this.Cate = Respuesta);
  }
  Refrescar(){
    this.conexion.VerPeriodo(this.id).subscribe(Respuesta => this.periodo = Respuesta);
    this.validar = false;
  }
}
