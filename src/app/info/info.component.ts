import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private ApiService: ApiService) { }

  public loginID;
  ngOnInit(): void {
    this.loginID = this.ApiService.LoginID;
  }

  logout(){
    this.ApiService.logOut();
  }

}
