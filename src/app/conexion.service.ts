import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { User } from './Model/User.model';
import { Paises } from './Model/Paises.model';
import { Lugar } from './Model/Lugar.model';
import { LugarCategorias } from './Model/LC.model';
import { Periodo } from './Model/Periodo.model';
import { Reserva } from './Model/Reserva.Model';
import { Notificationes } from './Model/Notificaciones.model';
import { Comentario } from './Model/Comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  //url = 'http://localhost/ApiEjemplo/public';
  url = 'https://sheltered-stream-77543.herokuapp.com';
  private _refresh$ = new Subject<void>();
  private _refreshAnf$ = new Subject<void>();
  private httpHeader = new HttpHeaders( {
    'Authorization': 'RcgkvUAAOpGckyWonLANuTAZEFtU7VkZ'
    });
  constructor(private http: HttpClient) { }
  /*Categorias*/
  get refresh$(){
    return this._refresh$;
  }
  get refreshAnf$(){
    return this._refreshAnf$;
  }
  obtenerIcon() : Observable<any>{
    return this.http.get(`${this.url}/categorias`);
  }
  /*lugares*/
  capturarLugares() : Observable<any> {
    return this.http.get(`${this.url}/l`);
  }
  LugarIndividual(id: any) : Observable<any> {
    return this.http.get(`${this.url}/l/${id}`);
  }
  newLugar( lugar: Lugar ): Observable<any> {
    return this.http.post(`${this.url}/l`, lugar , { headers: this.httpHeader});
  }
  EliminarLugar(id: any) : Observable<any> {
    return this.http.delete(`${this.url}/l/${id}`);
  }
  /*Imagenes de lugares*/
  capturaIL() : Observable<any>{
    return this.http.get(`${this.url}/il`);
  }
  /* General */
  VerGeneral(num : any, id: any) : Observable<any> {
    return this.http.get(`${this.url}/general/${num}/${id}`);
  }
  /* Periodo */
  PeriodoGetAll() : Observable<any> {
    return this.http.get(`${this.url}/pl`);
  }
  FinalizarPeriodo() : Observable<any> {
    return this.http.get(`${this.url}/pf`);
  }
  /* Usuario*/
  NewUser(user: User): Observable<any> {
    return this.http.post(`${this.url}/usuario`, user,  { headers: this.httpHeader});
  }
  InfoUser(id : any): Observable<any>{
    return this.http.get(`${this.url}/usuario/${id}`);
  }
  AllUser(): Observable<any>{
    return this.http.get(`${this.url}/usuario`);
  }
  ModificarUser(id: any, user: User): Observable<any>{
    return this.http.put(`${this.url}/usuario/${id}`, user, { headers: this.httpHeader});
  }
  UserIndividual(id : any): Observable<any> {
    return this.http.get(`${this.url}/usuario/${id}`);
  }
  VerUser(): Observable<any> {
    return this.http.get(`${this.url}/paises`).pipe(tap(() => {
      this._refresh$.next();
    } ));
  }
  Anfitrion(): Observable<any> {
    return this.http.get(`${this.url}/paises`).pipe(tap(() => {
      this._refreshAnf$.next();
    } ));
  }
  /* Comentarios */
  verComentariosLugar(id: any, num: any) : Observable<any> {
    return this.http.get(`${this.url}/comenta/${id}/${num}`);
  }
  CargarComentario(comenta: Comentario) : Observable<any>{
    return this.http.post(`${this.url}/comenta`, comenta, { headers: this.httpHeader});
  }


  CargarImagenes(imagen : any, id: any) : Observable<any> {
    const image = new FormData;
    image.append('imagen', imagen);
    image.append('idLugar', id);
    return this.http.post(`${this.url}/imagen`,image,{ headers: this.httpHeader});
  }

  ModificarLugar(lugar: Lugar, id: any) : Observable<any> {
    return this.http.put(`${this.url}/l/${id}`, lugar , { headers: this.httpHeader});
  }
  PeriodoPost(Pe: Periodo) : Observable<any> {
    return this.http.post(`${this.url}/pl`, Pe ,{ headers: this.httpHeader});
  }
  CategoriasLugar(lc: LugarCategorias): Observable<any>{

    return this.http.post(`${this.url}/lc`,lc,{ headers: this.httpHeader});
  }


  //Reserva y Notificaciones
  CapturarReserva(reserva: Reserva) : Observable<any> {
    return this.http.post(`${this.url}/reserva`,reserva,{ headers: this.httpHeader});
  }
  CapturarNotificacion(reserva: Notificationes) : Observable<any> {
    return this.http.post(`${this.url}/notificacion`,reserva,{ headers: this.httpHeader});
  }
  VerReserva() : Observable<any> {
    return this.http.get(`${this.url}/reserva`);
  }
  VerNotificaciones(id: any) : Observable<any> {
    return this.http.get(`${this.url}/notificacion/${id}`);
  }
  VerPeriodo(id: any) : Observable<any> {
    return this.http.get(`${this.url}/pl/${id}`);
  }
  ActualizarPeriodo(id: any, periodo: Periodo) : Observable<any> {
    return this.http.put(`${this.url}/pl/${id}`, periodo, { headers: this.httpHeader});
  }
}
