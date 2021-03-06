import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from  '@angular/forms';

import { MapComponent } from './map/map.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { BuyGraveComponent } from './buy-grave/buy-grave.component';
import { PaymentGateComponent } from './payment-gate/payment-gate.component';
//import { ApiService } from './_services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RegistrationComponent,
    LoginComponent,
    InfoComponent,
    AdminBoardComponent,
    UserBoardComponent,
    BuyGraveComponent,
    PaymentGateComponent,
   // ApiService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BuyGraveComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
