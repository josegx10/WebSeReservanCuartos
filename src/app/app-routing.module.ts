import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { CuartoComponent } from './cuarto/cuarto.component';

const routes: Routes = [
  { path: ':id', component: CuartoComponent},
  { path: '' , component: GeneralComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
