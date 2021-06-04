import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Cemetery, Corpses } from '../class/Cemetery';
import { Payment, Registration } from '../class/Registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  
  registration: Registration[];
  cemetery: Cemetery[];
  corpses : Corpses[];
  payment : Payment[];
  selectedUser : Registration = {id_user: null, name: null, lastname: null, email: null, password: null, number: null, town: null, street: null, number_house:null, postcode: null};
  constructor(private ApiService: ApiService,
    private router: Router) { }
  public loginID;
  private selectedIdGrave = -1; 
  public update = -1;
  ngOnInit(): void {
    this.loginID = this.ApiService.LoginID;

    this.ApiService.readUserProfil().subscribe((registration: Registration[])=>{
      this.registration = registration;
    });

    this.ApiService.readUserGraves().subscribe((cemetery: Cemetery[])=>{
      this.cemetery = cemetery;
    });

    console.log("user corpse", this.corpses);
    this.ApiService.readUserCorpses().subscribe((corpses: Corpses[])=>{
      this.corpses = corpses;
    });

    console.log("user corpse", this.corpses);
    this.ApiService.readUserPayment().subscribe((payment: Payment[])=>{
      this.payment = payment;
    });
  } 

  logout(){
    this.ApiService.logOut();
  }

  selectIDGrave(id){
    this.ApiService.GraveID = id;
    this.ApiService.newOld = 1;
    this.router.navigate(['/payment-gate']);
  }

  updateUser(form){

    if(this.selectedUser && this.selectedUser.id_user){
      form.value.id_user = this.selectedUser.id_user;
      this.ApiService.updateUser(this.selectedUser).subscribe((registrations: Registration)=>{
      });
    }
  
  }

  selectUser(registration: Registration){
    this.update = 1;
    this.selectedUser = registration;
  }

  reset(){
    this.update = -1;
  }

}
