import { Component, OnInit } from '@angular/core';
import { Cemetery, Corpses } from '../class/Cemetery';
import { Registration, DeleteA} from '../class/Registration';
import { Payment } from '../class/Login';
import { ApiService } from '../_services/api.service';
import { MapService } from '../_services/map.service';


@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  selectedValue = "cemetery";
  optionValue;
  public loginID;
  public choose = -1;
  cemetery: Cemetery[];
  corpses: Corpses[];
  registration: Registration[];
  payment: Payment[];
  arr: DeleteA[];
  selectedGrave: Cemetery = {id_grave: null, id_user:null, coor1: null, coor2: null, coor3: null, coor4: null, type: null};
  selectedCorpse : Corpses = {id_corpse: null, id_grave: null, name: null, lastname: null, birthDay: null, deadDay: null, paidBy: null  };
  selectedUser : Registration = {id_user: null, name: null, lastname: null, email: null, password: null, number: null, town: null, street: null, number_house:null, postcode: null};
  selectedPayment : Payment = {id_user: null, id_grave: null, paidDay: null, type: null };
  constructor(private ApiService: ApiService,
    private MapService: MapService,) { }

  ngOnInit(): void {
    this.loginID = this.ApiService.LoginID;
    this.ApiService.readCemetery().subscribe((cemetery: Cemetery[])=>{
    this.cemetery = cemetery;
    console.log('id', this.ApiService.LoginID);
  });
  this.ApiService.readCorpses().subscribe((corpses: Corpses[])=>{
    this.corpses = corpses;
  });
  this.ApiService.readUsers().subscribe((registration: Registration[])=>{
    this.registration = registration;
  })
  this.ApiService.readPayment().subscribe((payment: Payment[])=>{
    this.payment = payment;
  })
}

selectedTable: string = '';

//event handler for the select element's change event
selectChangeHandler (event: any) {
  //update the ui
  this.selectedTable = event.target.value;
}


select(){
  this.selectedValue = "users";
}

delete(id,type){
  console.log(id, type);
  
  if(type == 'user'){
    this.ApiService.deleteSom(id,type).subscribe((arr: DeleteA)=>{
      console.log("User deleted, ", arr);
    });
  }
  if(type == 'grave'){
    this.ApiService.deleteSom(id,type).subscribe((arr: DeleteA)=>{
      console.log("Grave deleted, ", arr);
    });
  }
  if(type == 'corpse'){
    this.ApiService.deleteSom(id,type).subscribe((arr: DeleteA)=>{
      console.log("Corpse deleted, ", arr);
    });
  }
}

updateUser(form){

  console.log("create",this.selectedUser ,this.selectedUser.id_user );
  if(this.selectedUser && this.selectedUser.id_user){
    console.log("id upd",form.value.id_user);
    form.value.id_user = this.selectedUser.id_user;
    this.ApiService.updateUser(this.selectedUser).subscribe((registrations: Registration)=>{
      console.log("User updated" , form.value);
    });
  }

}

updateCorpse(form){
  if(this.selectedCorpse && this.selectedCorpse.id_corpse){
    form.value.id_corpse == this.selectedCorpse.id_corpse;
    this.ApiService.updateCorpse(this.selectedCorpse).subscribe((corpse: Corpses)=>{
      console.log("User update", corpse);
    });
  }
}

createCorpse(form){
  this.ApiService.createCorpse(form.value).subscribe((corpse: Corpses)=>{
    console.log("Grave corpse, ", corpse);
  });
}

updateGrave(form){
  if(this.selectedGrave && this.selectedGrave.id_grave){
    form.value.id_corpse == this.selectedGrave.id_grave;
    this.ApiService.updateGrave(this.selectedGrave).subscribe((cemetery: Cemetery)=>{
      console.log("Grave update", cemetery);
    });
  }
}
createGrave(form){
    this.ApiService.createGrave(form.value).subscribe((cemetery: Cemetery)=>{
      console.log("Grave created, ", cemetery);
    });
}

updatePayment(form){
  if(this.selectedPayment && this.selectedPayment.id_user){
    form.value.id_corpse == this.selectedPayment.id_user;
    this.ApiService.updatePayment(this.selectedPayment).subscribe((payment: Payment)=>{
      console.log("Grave update", payment);
    });
  }
}
createPayment(form){
    this.ApiService.createPayment(form.value).subscribe((payment: Payment)=>{
      console.log("Grave created, ", payment);
    });
}

selectUser(registration: Registration){
  this.selectedUser = registration;
}

selectCorpse(corpses: Corpses){
  this.selectedCorpse = corpses;

}
selectGrave(cemetery: Cemetery){
  this.selectedGrave = cemetery;
}

selectPayment(payment: Payment){
  this.selectedPayment = payment;
}

logout(){
  this.ApiService.logOut();
}

sendMails():void{
  this.MapService.sendMails().subscribe((res: any) =>{});
}

chooseCreate(){
  this.choose = 1;
}

reset(){
  console.log("reset",this.choose);
  this.choose = -1;
}

}

