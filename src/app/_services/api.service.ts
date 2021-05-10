import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Registration } from '../class/registration';
import { Login, Payment } from '../class/Login';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'; 
import { map } from 'rxjs/operators';
import { Cemetery, Corpses } from '../class/Cemetery';
import { RegistrationComponent } from '../registration/registration.component';

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
  private apiCreate = 'http://localhost/apiCreate.php/' ;
  private apiDelete = 'http://localhost/apiDelete.php/';

  constructor(private http: HttpClient,
    private router: Router) {


  }

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
    return this.http.get<Payment[]>(`http://localhost/readAdminUsers.php`);
  }

  registerUser(userData: Registration): number {
    console.log(userData);
    const x = this.http.post(this.apiUrl, userData, httpOptions).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    return 1;
  } 

control(res){

  console.log("control ", res[0]['prihlasenie'] );
  if(res[0]['prihlasenie']  != false){
    console.log("prihllaseny");
    return res[0]['prihlasenie'];
    //this.router.navigate(['/', 'afterlog']);
  }
  else{
    //console.log("zle heslo");
    return res[0]['prihlasenie'];
  }
}

loginrUser(userData: Login): any {

  console.log("api ", userData);
  const x = this.http.post(this.apiUrl, userData, httpOptions).subscribe(response => {
    this.control(response);

    var a = response[0]['prihlasenie'];
    console.log("toto je a ", a);
    if(this.control(response) > 0){
      if(userData['id_user'] == 1){
        console.log("je prihlaseny",userData['id_user']);
        //this.router.navigate(['/', 'dashboard']);
        return userData['id_user'];

      }
      //else{this.router.navigate(['/', 'dashboard'],{ skipLocationChange: true });}
    }
    else{console.log("neprihlaseny");} 
});

  return -1;
}

deletePolicy(id: number,type: string){
  console.log("daco",id, type);
  return this.http.delete(`http://localhost/delete.php/?id=${id}&type=${type}`);
}

updateUser(registration: Registration){
  console.log("api reg", registration);
  return this.http.put<Registration>(`http://localhost/updateUser.php`, registration)
}
updateCorpse(corpse: Corpses){
  console.log("api", corpse);
  return this.http.put<Corpses>(`http://localhost/updateCorpse.php`,corpse);
}

/*
logOut(){
  console.log("log out");
  this.router.navigate(['/homepage']);
  console.log("api");

} */

}