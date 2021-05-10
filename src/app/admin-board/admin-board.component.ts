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
    this.ApiService.deletePolicy(id,type).subscribe((arr: DeleteA)=>{
      console.log("User deleted, ", arr);
    });
  }
  if(type == 'grave'){
    this.ApiService.deletePolicy(id,type).subscribe((arr: DeleteA)=>{
      console.log("Grave deleted, ", arr);
    });
  }
  if(type == 'corpse'){
    this.ApiService.deletePolicy(id,type).subscribe((arr: DeleteA)=>{
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
    console.log("create v if selected ",this.selectedUser.id_user );
    console.log("create v if form id  ", form.value.id_user);
    console.log("create v if registration ", form.value);
    this.ApiService.updateCorpse(form.value).subscribe((corpse: Corpses)=>{
      console.log("User update", form.value);
    });
  }
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


}

