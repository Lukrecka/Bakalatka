import { Component, OnInit } from '@angular/core';
import { Cemetery, Corpses } from '../class/Cemetery';
import { Registration, DeleteA} from '../class/Registration';
import { Payment } from '../class/Login';
import { ApiService } from '../_services/api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  cemetery: Cemetery[];
  corpses: Corpses[];
  registration: Registration[];
  payment: Payment[];
  arr: DeleteA[];
  selectedGrave: Cemetery = {id_grave: null, coor1: null, coor2: null, coor3: null, coor4: null, type: null};
  selectedCorpse : Corpses = {id_corpse: null, id_grave: null, name: null, lastname: null, birthDay: null, deadDay: null, paidBy: null  };
  selectedUser : Registration = {id_user: null, id_grave: null, name: null, lastname: null, email: null, password: null, number: null};
  selectedPayment : Payment = {id_user: null, id_grave: null, paidDay: null, type: null };
  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.readCemetery().subscribe((cemetery: Cemetery[])=>{
    this.cemetery = cemetery;
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
    console.log("id po = ",form.value.id_user);
    console.log("create v if selected ",this.selectedUser.id_user );
    console.log("create v if form ", form.value.id_user);
    console.log("create v if registration ", form.value);
    this.ApiService.updateUser(this.selectedUser).subscribe((registrations: Registration)=>{
      console.log("User updated" , form.value);
    });
  }

}

updateCorpse(form){
  if(this.selectedCorpse && this.selectedCorpse.id_corpse){
    form.value.id_corpse == this.selectedCorpse.id_corpse;
    console.log("id po = ",form.value.id_user);
    console.log("create v if selected ",this.selectedCorpse.id_corpse );
    console.log("create v if form id  ", form.value.id_corpse);
    console.log("create v if registration ", form.value);
    this.ApiService.updateCorpse(this.selectedCorpse).subscribe((corpse: Corpses)=>{
      console.log("User update", corpse);
    });
  }
  else{
      
    this.ApiService.createCorpse(form.value).subscribe((corpse: Corpses)=>{
      console.log("Policy created, ", corpse);
    });
  }
}

updateGrave(form){
  if(this.selectedGrave && this.selectedGrave.id_grave){
    form.value.id_corpse == this.selectedGrave.id_grave;
    console.log("id po = ",form.value.id_user);
    console.log("create v if selected ",this.selectedGrave.id_grave );
    console.log("create v if form id  ", form.value.id_grave);
    console.log("create v if registration ", form.value);
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
    console.log("id po = ",form.value.id_user);
    console.log("create v if selected ",this.selectedPayment.id_user );
    console.log("create v if form id  ", form.value.id_user);
    console.log("create v if registration ", form.value);
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
  console.log("selectUser", this.selectedUser);
  console.log("reg", registration);

}

selectCorpse(corpses: Corpses){
  this.selectedCorpse = corpses;
  console.log("selectCorpse", corpses);

}
selectGrave(cemetery: Cemetery){
  this.selectedGrave = cemetery;
  console.log("selectGrave", cemetery);
}

selectPayment(payment: Payment){
  this.selectedPayment = payment;
  console.log("selectGrave", payment);

}


}

