import { Component, OnInit } from '@angular/core';
import { BuyGraveComponent } from '../buy-grave/buy-grave.component';
import { BuyGrave } from '../class/Registration';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  constructor(private ApiService: ApiService) { }
  
  ngOnInit(): void {
   console.log('id', this.ApiService.LoginID);
  }

  loginrUser(data): void {
    data.action = 'login';
    const x = this.ApiService.loginrUser(data);
    console.log("dash ", data);
    console.log(x);
    
  }

  logout(){
    this.ApiService.logOut();
  }

}
