import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
  }

  loginrUser(data): void {
    data.action = 'login';
    const x = this.ApiService.loginrUser(data);
    console.log("dash ", data);
    console.log(x);
    
  }

}
