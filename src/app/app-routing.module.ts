import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserBoardComponent } from './user-board/user-board.component';

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'info', component: InfoComponent},
  {path: 'adminBoard', component: AdminBoardComponent},
  {path: 'userBoard' , component: UserBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
