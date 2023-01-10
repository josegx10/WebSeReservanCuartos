import { Component } from '@angular/core';

@Component({
  selector: 'app-cuarto',
  templateUrl: './cuarto.component.html',
  styleUrls: ['./cuarto.component.css']
})
export class CuartoComponent {
  acceso = 1;
  CambiarAcceso($event: any){
    this.acceso = $event;
    return false;
  }
}
