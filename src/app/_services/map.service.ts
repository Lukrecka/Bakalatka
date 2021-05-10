import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Cemetery } from '../class/Cemetery';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl =  'http://localhost/cemeteryMap.php';

  constructor(private http: HttpClient,
    private router: Router) {
  }

  readValues() : Observable<Cemetery[]>{
    return this.http.get<Cemetery[]>(this.apiUrl);
  }
   
  findGrave(data: string): any {
    var i = 0;
    this.http.get(this.apiUrl).subscribe((res: any) =>{
      for(const c of res){
        //console.log(res[i]['Priezvisko']);
        var lastname = res[i]['lastname'];
        if(lastname.toUpperCase() == data['lastname'].toUpperCase()){
          //console.log("rovna sa");
          return 1;
        }
        else {return 0;}
        i++;
      }
    });
    return 0;
  }

  sendMails(){
    console.log("sedn email");
    return this.http.get<any>(`http://localhost/sendEmail.php/`);

  }

}
