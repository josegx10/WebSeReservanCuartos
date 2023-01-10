import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-menu-cuartos',
  templateUrl: './menu-cuartos.component.html',
  styleUrls: ['./menu-cuartos.component.css']
})
export class MenuCuartosComponent implements OnInit, OnDestroy{
  @Output() acceso = new EventEmitter<number>();
  Lugares : any = [];
  Image: Array<any> = [];
  Periodo: any = [];
  ordenar: any;
  order: string = 'id';
  alreves: boolean = false;
  id = localStorage.getItem('Id');
  suscription!: Subscription;
  constructor(private conexion: ConexionService, private cookie: CookieService) {
  }
  cate=this.cookie.get('Categoria');
  ngOnInit(): void {
    this.verLugar();
    this.suscription = this.conexion.refresh$.subscribe(() => {
      this.verLugar();
    })


    this.obtenerImage();
    this.verPeriodo();
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }
  InfoCuartos(id: any){
    this.cookie.set('Cuarto',id);
    this.cookie.set('acceso','2')
    this.acceso.emit(3);
  }
  verLugar(){
    this.cate = this.cookie.get('Categoria');
    if(this.cate == '24'){
      const data = [this.cookie.get('CP'), this.cookie.get('fechaI'), this.cookie.get('fechaF')];
      this.Lugares = [];
      this.conexion.capturarLugares().subscribe(Respuesta => {
        for(let l of Respuesta){
          if(data[0] == l.CP){
            this.Lugares.push(l);
          }
        }
        this.conexion.PeriodoGetAll().subscribe(Respuesta => {
          let verifica = true;
          let array: any = [];
          for(let p of Respuesta){
            if(data[1] >= p.fInicial && data[2] <= p.fFinal){
              for(let l of this.Lugares){
                if(l.id == p.id_lugar){
                  verifica=false;
                }else{
                  array.push(p.id_lugar);
                }
              }
              if(verifica){
                for(let a of array){
                  this.conexion.LugarIndividual(a).subscribe(Respuesta => this.Lugares.push(Respuesta[0]));
                }
              }
            }
          }
        });
        if(data[0] == '' || this.Lugares.length == 0){
          this.conexion.PeriodoGetAll().subscribe(Respuesta => {
            for(let p of Respuesta){
              if(data[1] >= p.fInicial && data[2] <= p.fFinal){
                this.conexion.LugarIndividual(p.id_lugar).subscribe(Respuesta => this.Lugares.push(Respuesta[0]))
              }
            }
          }); 
        }
      });
    }else if(this.cate == '23'){
      const data = [this.cookie.get('Descripcion0'), this.cookie.get('Descripcion1'), this.cookie.get('Descripcion2'), this.cookie.get('Descripcion3'), this.cookie.get('Descripcion4'), this.cookie.get('Descripcion5'), this.cookie.get('Descripcion6'), this.cookie.get('Descripcion7'), this.cookie.get('minimo'), this.cookie.get('maximo'), this.cookie.get('huesped'), this.cookie.get('banios'), this.cookie.get('camas')];
      this.Lugares = [];
      this.conexion.capturarLugares().subscribe(Respuesta => {
        for(let l of Respuesta){
          if(data[0] == l.Descripcion_Lugar || data[1] == l.Descripcion_Lugar || data[2] == l.Descripcion_Lugar || data[3] == l.Descripcion_Lugar || data[4] == l.Descripcion_Lugar){
            this.Lugares.push(l);
          }else if(data[5] == l.Tipo_espacio|| data[6] == l.Tipo_espacio|| data[7] == l.Tipo_espacio){
            this.Lugares.push(l);
          }else if(parseFloat(data[8]) >= parseFloat( l.Dinero) && parseFloat( data[9]) <= parseFloat( l.Dinero)){
            this.Lugares.push(l);
          }else if(data[10] == l.NHuespedes || data[11] == l.NBanios || data[12] == l.NCamas){
            this.Lugares.push(l);
          }

        }
      });
    }else if(this.cate == '22'){
      this.conexion.capturarLugares().subscribe(Respuesta => this.Lugares = Respuesta);
    }else {
      this.conexion.VerGeneral(6,this.cate).subscribe(Respuesta => this.Lugares = Respuesta);
    }

  }
  obtenerImage(){
    this.conexion.VerGeneral(1,1).subscribe(Respuesta => this.Image = Respuesta);

    /*for(let i of info){
      console.log(i);
    }*/
  }
  verPeriodo(){
    this.conexion.PeriodoGetAll().subscribe(Respuesta => this.Periodo = Respuesta);
  }
  cambiarLugar(){



    /*for(let i of info){
      console.log(i);
    }*/
  }
  seleccionar(){
    console.log(this.ordenar);
    if(this.ordenar == 'default'){
      this.alreves = false;
      this.order = 'id';
    }else if(this.ordenar == 'periodoMayor'){
      this.alreves = true;
      this.order = 'fechaI';
    }else if(this.ordenar == 'periodoMenor'){
      this.alreves = false;
      this.order = 'fechaI';
    }else if(this.ordenar == 'precioMayor'){
      this.alreves = true;
      this.order = 'precio';
    }else if(this.ordenar == 'precioMenor'){
      this.alreves = false;
      this.order = 'precio';
    }
  }
}
