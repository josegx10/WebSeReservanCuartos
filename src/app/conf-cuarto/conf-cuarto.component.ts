import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConexionService } from '../conexion.service';
import { Lugar } from '../Model/Lugar.model';
import { Notificationes } from '../Model/Notificaciones.model';
import { Periodo } from '../Model/Periodo.model';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-conf-cuarto',
  templateUrl: './conf-cuarto.component.html',
  styleUrls: ['./conf-cuarto.component.css']
})
export class ConfCuartoComponent implements OnInit{ 
  Editar = 0;
  Lugar: any = [];
  periodo: any = []
  habilitado : any;
  dinero = new FormControl('');
  valido : any;
  huesped = new FormControl('');
  camas=new FormControl('');
  banios=new FormControl('');
  titulo=new FormControl('');
  descripcion=new FormControl('');
  fechaI=new FormControl('');
  fechaF=new FormControl('');
  @Output() acceso = new EventEmitter<number>();
  id = this.cookie.get('Cuarto');
  comentario: any = [];
  usuarios: any = [];
  reserva: any = [];
  constructor(private cookie: CookieService , private conexion: ConexionService, private toast: ToastrService, private socket: SocketService){
  }
  ngOnInit(): void {
    this.Cuartos();
  }
  CambiarEditar(num: number) : boolean{
    this.Editar = num;
    this.conexion.PeriodoGetAll().subscribe(Respuesta => this.periodo = Respuesta);
    return false;
  }
  CambiarAcceso($event : any){
    this.acceso.emit($event);
    return false;
  }
  Cuartos(){
    this.conexion.verComentariosLugar(this.id, 0).subscribe(Respuesta => this.comentario = Respuesta);
    this.conexion.AllUser().subscribe(Respuesta => this.usuarios = Respuesta);
    this.conexion.VerReserva().subscribe(Respuesta => this.reserva = Respuesta)
    this.conexion.LugarIndividual(this.id).subscribe(Respuesta => {
      if(Respuesta[0].enable == 1){
        this.habilitado = 'Habilitado';
        this.valido = true;
      }else {
        this.habilitado = 'Desabilitado';
        this.valido = false;
      }
      this.dinero.setValue(Respuesta[0].Dinero);
      this.huesped.setValue(Respuesta[0].NHuespedes);
      this.camas.setValue(Respuesta[0].NCamas);
      this.banios.setValue(Respuesta[0].NBanios);
      this.titulo.setValue(Respuesta[0].Titulo);
      this.descripcion.setValue(Respuesta[0].Descripcion);
      this.Lugar = Respuesta;
    });
    this.conexion.PeriodoGetAll().subscribe(Respuesta => this.periodo = Respuesta);
  }
  AgregarPeriodo(idUser: any, id: any ){
    if(this.fechaI.value != '' &&  this.fechaF.value != ''){
      if(`${this.fechaI.value}` <= `${this.fechaF.value}`){
        this.conexion.PeriodoGetAll().subscribe(Respuesta => {
          var valor = true;
          for(let r of Respuesta){
            if(id == r.id_lugar){
              if(r.fInicial <=  `${this.fechaI.value}` && r.fFinal  >= `${this.fechaI.value}`){
                valor = false;
              }else if(r.fInicial <=  `${this.fechaF.value}` && r.fFinal >=  `${this.fechaF.value}`) {
                valor = false;
              }else {
  
              }
            }
          }
          if(valor){
            this.conexion.PeriodoPost(new Periodo(idUser,id,`${this.fechaI.value}`, `${this.fechaF.value}`, true)).subscribe(Respuesta => {});
            this.Editar = 0;
            this.toast.success('Periodo Registrado', 'Periodo Exitoso');
          }else {
            this.toast.error('el dia inicial o final encaja en otro dia de un periodo','Error de periodo')
          }
        });
      }else {
        this.toast.error('La fecha inicial es mayor que la final', 'Error Fechas');
      }
    }else {
      this.toast.error('Ingresa las fechas', 'Error: Falta ingresar las fechas');
    }
  }
  ModificarLugar(id: any, idUsuario: any, ubicacion:any, TipoLugar: any, TipoDesc: any, TipoEsp: any, Calle: any, opcion: any, Ciudad: any, Estado: any, cp: any, Pais: any ){
    this.conexion.ModificarLugar(new Lugar(idUsuario,ubicacion,TipoLugar,TipoDesc, TipoEsp,Calle,opcion,Ciudad,Estado,cp,Pais,parseInt(`${this.huesped.value}`), parseInt(`${this.banios.value}`),parseInt(`${this.camas.value}`), `${this.descripcion.value}`, `${this.titulo.value}`, parseFloat(`${this.dinero.value}`), this.valido),id).subscribe(Respuesta => {
      if(Respuesta.enable){
        this.habilitado = 'Habilitado';
        this.valido = true;
      }else {
        this.habilitado = 'Desabilitado';
        this.valido = false;
      }
      this.dinero.setValue(Respuesta[0].Dinero);
      this.huesped.setValue(Respuesta[0].NHuespedes);
      this.camas.setValue(Respuesta[0].NCamas);
      this.banios.setValue(Respuesta[0].NBanios);
      this.titulo.setValue(Respuesta[0].Titulo);
      this.descripcion.setValue(Respuesta[0].Descripcion);
      this.Lugar = Respuesta;
    });
  }
  EliminarCuarto(id: any){
    this.conexion.CapturarNotificacion(new Notificationes(localStorage.getItem('Id'), 'Haz eliminado tu cuarto')).subscribe(Respuesta => {});
    this.conexion.VerReserva().subscribe(Respuesta => {
      
      for(let r of Respuesta){
        if(r.idLugar == id){
          
          this.conexion.UserIndividual(localStorage.getItem('Id')).subscribe(Res => {
            this.conexion.CapturarNotificacion(new Notificationes(r.idUsuario, `El anfitrion ${Res[0].email} ha eliminado un cuarto que ya estabas registrado`)).subscribe(Respuesta => {});
            this.conexion.LugarIndividual(id).subscribe(Responde => {
              this.socket.emitEvent({
                name: 'EliminarCuarto',
                id: r.idUsuario, 
                nombre: Res[0].email
               });
            })
          })
           
        }
      }
    });
    this.toast.success('Se a eliminado tu cuarto', 'Cuarto Eliminado');
    this.conexion.EliminarLugar(id).subscribe(Respuesta => {});
    this.conexion.VerGeneral(4,this.id).subscribe(Respuesta => this.Lugar = Respuesta);
    this.acceso.emit(4);
  }
}
