import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BuyGrave, Registration } from '../class/registration';
import { Login, Payment } from '../class/Login';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'; 
import { Cemetery, Corpses } from '../class/Cemetery';
import { BuyGraveComponent } from '../buy-grave/buy-grave.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
  serverData: any;

  private apiUrl =  'http://localhost/login/api.php/';
  private urlBuyNew = 'http://localhost/login/buyGraveNew.php';
  private urlBuyOld = 'http://localhost/login/buyGraveOld.php';
  public LoginID = -1;
  public GraveID = -1;
  public newOld = -1;
  constructor(private http: HttpClient,
    private router: Router) {


  }
// Table / charts for admin
  readValues(): Observable<Registration[]>{
    return this.http.get<Registration[]>(`http://localhost/read.php/`);
  }

  readCemetery(): Observable<Cemetery[]>{
    return this.http.get<Cemetery[]>(`http://localhost/readAdmin/readAdminCemetery.php/`);
  }

  readCorpses(): Observable<Corpses[]>{
    return this.http.get<Corpses[]>(`http://localhost/readAdmin/readAdminCorpses.php`);
  }
  readUsers(): Observable<Registration[]>{
    return this.http.get<Registration[]>(`http://localhost/readAdmin/readAdminUsers.php`);
  }
  readPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(`http://localhost/readAdmin/readAdminPayment.php`);
  }

  // DELETE from charts ADMIN
deleteSom(id: number,type: string){
  console.log("daco",id, type);
  return this.http.delete(`http://localhost/adminCRUD/delete.php/?id=${id}&type=${type}`);
}

//UPDATE or CREATE record ADMIN
updateUser(registration: Registration){
  console.log("api reg", registration);
  return this.http.put<Registration>(`http://localhost/adminCRUD/updateUser.php`, registration)
}
updateCorpse(corpse: Corpses){
  console.log("api", corpse);
  return this.http.put<Corpses>(`http://localhost/adminCRUD/updateCorpse.php`,corpse);
} 
createCorpse(corpse: Corpses): Observable<Corpses>{
  console.log("create cor", corpse);
  return this.http.post<Corpses>(`http://localhost/adminCRUD/createCorpse.php`, corpse);
}
updateGrave(cemetery: Cemetery){
  console.log("api", cemetery);
  return this.http.put<Cemetery>(`http://localhost/adminCRUD/updateGrave.php`,cemetery);
} 
createGrave(cemetery: Cemetery): Observable<Cemetery>{
  console.log("create cor", cemetery);
  return this.http.post<Cemetery>(`http://localhost/adminCRUD/createGrave.php`, cemetery);
}
updatePayment(payment: Payment){
  console.log("api", payment);
  return this.http.post<Payment>(`http://localhost/adminCRUD/updatePayment.php`,payment);
} 
createPayment(payment: Payment): Observable<Payment>{
  console.log("create cor", payment);
  return this.http.post<Payment>(`http://localhost/adminCRUD/createPayment.php`, payment);
}

//REGISTRATION users
registerUser(userData: Registration): number {
  console.log(userData);
  const x = this.http.post(this.apiUrl, userData, httpOptions).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
  return 1;
} 

//LOGIN user
control(res){

  console.log("control ", res[0]['prihlasenie'] );
  if(res[0]['prihlasenie']  != false){
    console.log("prihllaseny");
    //ADMIN
    if(res[0]['prihlasenie'] == 1){
      this.router.navigate(['/adminBoard'],{ skipLocationChange: true });
    }
    else if(res[0]['prihlasenie'] > 1){
      this.router.navigate(['/userBoard'],{ skipLocationChange: true });
    }

  }
  else{
    console.log("zle heslo");
    this.LoginID = res[0]['prihlasenie'];
    return res[0]['prihlasenie'];
  }
  this.LoginID = res[0]['prihlasenie'];
}

loginrUser(userData: Login): any {

console.log("api ", userData);
const x = this.http.post(this.apiUrl, userData, httpOptions).subscribe(response => {
  this.control(response);

  var a = response[0]['prihlasenie'];
  console.log("toto je a ", a);
  this.control(response);

});

return -1;
}

//LOGOUT
logOut(){
  this.router.navigate(['/info']);
  this.LoginID = -1;
  console.log("log out", this.LoginID);

} 

isLog(){
  if(this.LoginID > 0){
    
  }
}

//Table / chart for users

readUserProfil(): Observable<Registration[]>{
  console.log(this.LoginID);
  return this.http.get<Registration[]>(`http://localhost/user/readProfil.php/?id=${this.LoginID}`);
}

readUserGraves(): Observable<Cemetery[]>{
  console.log(this.LoginID);
  return this.http.get<Cemetery[]>(`http://localhost/user/readUsersGraves.php/?id=${this.LoginID}`);
}

readUserCorpses(): Observable<Corpses[]>{
  console.log(this.LoginID);
  return this.http.get<Corpses[]>(`http://localhost/user/readUsersCorpses.php/?id=${this.LoginID}`);
}

readUserPayment(): Observable<Payment[]>{
  console.log(this.LoginID);
  return this.http.get<Payment[]>(`http://localhost/user/readUsersPayment.php/?id=${this.LoginID}`);
}


//BUY GRAVE NEW
buyGrave(userData: BuyGrave): number {
  console.log(userData);
  const x = this.http.post(this.urlBuyNew, userData, httpOptions).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
  return 1;
}

contractExtension(userData: BuyGrave): number {
  console.log(userData);
  const x = this.http.post(this.urlBuyOld, userData, httpOptions).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
  return 1;
}

updateUserProfile(registration: Registration){
  console.log("api reg", registration);
  return this.http.put<Registration>(`http://localhost/user/updateUser.php`, registration)
}

}