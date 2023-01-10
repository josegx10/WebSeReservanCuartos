import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {
  apiCp = 'https://apis.forcsec.com/api/codigos-postales/20221217-2a03cfce770a9338';
  
  
  constructor(private http: HttpClient) { }

  ApiCp(cp : any) : Observable<any> {
    return this.http.get(`${this.apiCp}/${cp}`);

  }
  
  
}
