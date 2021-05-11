import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Registration } from '../class/registration';
import { Login, Payment } from '../class/Login';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'; 
import { Cemetery, Corpses } from '../class/Cemetery';

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

  private apiUrl =  'http://localhost/api.php/';
  private LoginID = -1;
  constructor(private http: HttpClient,
    private router: Router) {


  }
// Table / charts for admin
  readValues(): Observable<Registration[]>{
    return this.http.get<Registration[]>(`http://localhost/read.php/`);
  }

  readCemetery(): Observable<Cemetery[]>{
    return this.http.get<Cemetery[]>(`http://localhost/readAdminCemetery.php/`);
  }

  readCorpses(): Observable<Corpses[]>{
    return this.http.get<Corpses[]>(`http://localhost/readAdminCorpses.php`);
  }
  readUsers(): Observable<Registration[]>{
    return this.http.get<Registration[]>(`http://localhost/readAdminUsers.php`);
  }
  readPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(`http://localhost/readAdminPayment.php`);
  }

  // DELETE from charts ADMIN
deleteSom(id: number,type: string){
  console.log("daco",id, type);
  return this.http.delete(`http://localhost/delete.php/?id=${id}&type=${type}`);
}

//UPDATE or CREATE record ADMIN
updateUser(registration: Registration){
  console.log("api reg", registration);
  return this.http.put<Registration>(`http://localhost/updateUser.php`, registration)
}
updateCorpse(corpse: Corpses){
  console.log("api", corpse);
  return this.http.put<Corpses>(`http://localhost/updateCorpse.php`,corpse);
} 
createCorpse(corpse: Corpses): Observable<Corpses>{
  console.log("create cor", corpse);
  return this.http.post<Corpses>(`http://localhost/createCorpse.php`, corpse);
}
updateGrave(cemetery: Cemetery){
  console.log("api", cemetery);
  return this.http.put<Cemetery>(`http://localhost/updateGrave.php`,cemetery);
} 
createGrave(cemetery: Cemetery): Observable<Cemetery>{
  console.log("create cor", cemetery);
  return this.http.post<Cemetery>(`http://localhost/createGrave.php`, cemetery);
}
updatePayment(payment: Payment){
  console.log("api", payment);
  return this.http.put<Payment>(`http://localhost/updatePayment.php`,payment);
} 
createPayment(payment: Payment): Observable<Payment>{
  console.log("create cor", payment);
  return this.http.post<Payment>(`http://localhost/createPayment.php`, payment);
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
  console.log("log out");
  this.router.navigate(['/info']);
  this.LoginID = -1;
  console.log("api");

} 

//Table / chart for users

readUserGraves(): Observable<Cemetery[]>{
  console.log(this.LoginID);
  return this.http.get<Cemetery[]>(`http://localhost/readUsersGraves.php/?id=${this.LoginID}`);
}

readUserCorpses(): Observable<Corpses[]>{
  console.log(this.LoginID);
  return this.http.get<Corpses[]>(`http://localhost/readUsersCorpses.php/?id=${this.LoginID}`);
}

readUserPayment(): Observable<Payment[]>{
  console.log(this.LoginID);
  return this.http.get<Payment[]>(`http://localhost/readUsersPayment.php/?id=${this.LoginID}`);
}

}