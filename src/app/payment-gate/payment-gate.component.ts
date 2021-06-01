import { Component, Injectable, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { BuyGraveComponent } from '../buy-grave/buy-grave.component';
import { BuyGrave, Registration } from '../class/Registration';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-payment-gate',
  templateUrl: './payment-gate.component.html',
  styleUrls: ['./payment-gate.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class PaymentGateComponent implements OnInit {

  constructor(private buyGrave: BuyGraveComponent,
    private ApiService: ApiService) { }
  registration: Registration[];
  selectedUser : Registration = {id_user: null, name: null, lastname: null, email: null, password: null, number: null, town: null, street: null, number_house:null, postcode: null};
  public userID;
  public graveID;
  public newOld;
  public isPaid = false;
  public update = -1;
  selectedGraveAll : BuyGrave = {id_user : null, id_grave : null}
  ngOnInit(): void {
    
    this.userID = this.ApiService.LoginID;
    this.graveID = this.ApiService.GraveID;
    this.newOld = this.ApiService.newOld;
    
    this.selectedGraveAll.id_grave = Number(this.graveID);
    this.selectedGraveAll.id_user = Number(this.userID);
    this.ApiService.readUserProfil().subscribe((registration: Registration[])=>{
      this.registration = registration;
    });

    console.log('id', this.ApiService.GraveID );
    console.log('idser', this.ApiService.LoginID);
    console.log('newOld', this.ApiService.newOld);
    console.log("sel all", this.selectedGraveAll);
    render(
      {
        id:"#myPaypalButtons",
        currency: "USD",
        value: "1.00",
        onApprove: (details) =>{
          console.log(details);
          console.log(details['status']);
          if(details['status'] == 'COMPLETED'){
            if(this.newOld == 0){
              this.ApiService.buyGrave(this.selectedGraveAll);
              this.ApiService.pdfGenerate(this.selectedGraveAll);
            }
            if(this.newOld == 1){
              this.ApiService.contractExtension(this.selectedGraveAll);
              this.ApiService.pdfGenerate(this.selectedGraveAll);
            }
          alert("Transaction Successfull");
          // this.ApiService.buyGrave(this.selectedGraveAll);
         }
        }

    });
  }

  //ADD PAYPAL

  addSript: boolean = false;
  finalAmount: number = 1;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AULui0Waj2W0GhbKxkHTylA3hlo-ucI_2Fd6Kk3EVtzNKCHvpvW2OB_W2uElLzQc5CMnknwMouvxnROf',
      production: '<>your-production-key>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount:{total: this.finalAmount, currency: 'USD'} }
          ]
        }
      });      
    },
    onAuthorize:(data, actions) => {
      console.log('Pay')
      return actions.payment.execute().then((payment)=>{

      })
    }
  };

  addPaypalScript(){
    console.log('bla')

    this.addSript = true;
    return new Promise((resolve, reject) =>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'http://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
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

  selectUser(registration: Registration){
    this.update = 1;
    //console.log("update", this.update);
    this.selectedUser = registration;
    console.log("select",this.selectedUser.email);
  }

  reset(){
    this.update = -1;
  }

  logout(){
    this.ApiService.logOut();
  }

}
