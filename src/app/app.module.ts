import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CabezeraComponent } from './cabezera/cabezera.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ConexionService } from './conexion.service';
import { ListCuartosComponent } from './list-cuartos/list-cuartos.component';
import { MenuCuartosComponent } from './menu-cuartos/menu-cuartos.component';
import { FiltroComponent } from './filtro/filtro.component';
import { InfoCuartosComponent } from './info-cuartos/info-cuartos.component';
import { HazteAnfitrionComponent } from './hazte-anfitrion/hazte-anfitrion.component';
import { ConfUserComponent } from './conf-user/conf-user.component';
import { ConfCuartoComponent } from './conf-cuarto/conf-cuarto.component';
import { ExtrasService } from './extras.service';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { AppRoutingModule } from './app-routing.module';
import { GeneralComponent } from './general/general.component';
import { CuartoComponent } from './cuarto/cuarto.component';
import { CabezeraCuartosComponent } from './cabezera-cuartos/cabezera-cuartos.component';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CabezeraComponent,
    OpcionesComponent,
    LoginComponent,
    RegistroComponent,
    ListCuartosComponent,
    MenuCuartosComponent,
    FiltroComponent,
    InfoCuartosComponent,
    HazteAnfitrionComponent,
    ConfUserComponent,
    ConfCuartoComponent,
    ComentariosComponent,
    NotificacionComponent,
    GeneralComponent,
    CuartoComponent,
    CabezeraCuartosComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocketIoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OrderModule,
    AppRoutingModule
  ],
  providers: [CookieService, ConexionService, SocketService, ExtrasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
