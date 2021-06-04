import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Registration } from '../class/registration'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrations: Registration[];
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
  }

  registerUser(data): void {
    data.action = 'register';
    const x = this.ApiService.registerUser(data);
    console.log(data);
    alert("Registrácia bola úspešná");
  } 

}
