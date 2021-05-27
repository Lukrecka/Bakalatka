import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../_services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cemetery } from '../class/Cemetery';
import { MapService } from '../_services/map.service';
import {render} from 'creditcardpayments/creditCardPayments';
import {BuyGrave} from '../class/Registration';
import { Router } from '@angular/router';
import { PaymentGateComponent } from '../payment-gate/payment-gate.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

declare let paypal: any;
@Component({
  selector: 'app-buy-grave',
  templateUrl: './buy-grave.component.html',
  styleUrls: ['./buy-grave.component.css']
})
export class BuyGraveComponent implements OnInit {
  private map;
  public loginID;
  cemetery : Cemetery[];
  buyGrave : BuyGrave[];

  private apiUrl =  'http://localhost/cemeteryMap.php';
  private selectedIdGrave = -1;  
  private paidDay;
  constructor(private http: HttpClient,
    private ApiService: ApiService,
    private router: Router) {
    
     }
  ngOnInit(): void {
    this.ApiService.readCemetery().subscribe((cemetery: Cemetery[])=>{
      this.cemetery = cemetery;
    });
    this.loginID = this.ApiService.LoginID;
    console.log('id', this.ApiService.LoginID);
    this.initMap(0);
  }
  
  private initMap(id): void{

    console.log("initmap",id);

    this.map = L.map('map').setView([48.17302204929083, 17.796473760841256],19);
    var center = [48.173444522726896, 17.797085711886186];
    const title = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
    	maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var imageUrl = 'http://ukazcicky.mywire.org/cintorin/bg2.jpg',
    imageBounds = [[48.172600246585304, 17.795846531348666], center];

    L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    L.imageOverlay(imageUrl, imageBounds).bringToFront();

    this.makeMarkers(this.map, id);
  }

  makeMarkers(map: L.map, id): void {
    var greenIcon = L.icon({
      iconUrl: 'http://ukazcicky.mywire.org/cintorin/rip.jpg',
  
      iconSize:     [30, 55], // size of the icon
      iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
  });
  const popupOptions = {
    className: "customPopup"
  };
    var i=0;
    this.http.get(this.apiUrl).subscribe((res: any) =>{
      for(const c of res){;

        var id_corpse = res[i]['id_corpse'];
        var id_grave = res[i]['id_grave'];
        var lat1 = res[i]['coor1'];
        var lon1 = res[i]['coor2'];
        var lat2 = res[i]['coor3'];
        var lon2 = res[i]['coor4'];
        var bounds = [[lat1,lon1], [lat2,lon2]];
        //const popupInfo = `
       // ${id_grave} <br> <button class="vyber" (click)="selectId1(${id_grave})" >Vyber</button>`
       if(id == id_grave && id != 0){
        var marker = L.rectangle(bounds, {color: "#00ff00", fillOpacity:100}).addTo(map);
        marker.bindPopup("id" + res[i]['id_grave']).openPopup();
       }
       
       if(id_corpse == null){
          
          console.log("prazdny volny");
          var marker = L.rectangle(bounds, {color: "#000099", fillOpacity:100}).addTo(map);
          marker.bindPopup("ID Miesta: " + res[i]['id_grave'] + '<br/>'+  '<button (click)="selectId()">Update</button' +"Voľné miesto") 

          /*
          L.rectangle(bounds, {color: "#000099", fillOpacity:100})
          .addTo(this.map)
          .bindPopup(`${id_grave} <br> <button class="vyber" (click)="selectId1(${id_grave})" >Vyber</button>`, popupOptions)
          .on("popupopen", () => {
            this.elementRef.nativeElement
              .querySelector(".vyber")
              .addEventListener("click", e => {
                this.selectId(id_grave);
              });
          }); */

        }
        i++;
      } 
    });
  } 

  removeMap(){
    this.map.remove();
  }

  markGrave(data): void {

    var i = 0;
    this.http.get(this.apiUrl).subscribe((res: any) =>{
      for(const c of res){
       // console.log(res[i]['lastname']);
        var priezvisko = res[i]['id_grave'];
        var hladaniePriezvisko = data;
        //console.log("id ozn " , hladaniePriezvisko);
        //console.log("id odpovedd ",priezvisko);
        if(priezvisko == hladaniePriezvisko){
        //  console.log("rovna sa", id);
          this.removeMap();
          this.initMap(hladaniePriezvisko);
        }
        else {console.log("nerovna sa");}
        i++;
      }
    });
   // console.log("poslane data" ,data['lastname']);
  }

  buyThisGrave(id){
    this.selectedIdGrave = id;
    this.ApiService.GraveID = id;
    this.ApiService.newOld = 0;
    this.router.navigate(['/payment-gate']);
  }

  selectId(a){
    this.selectedIdGrave = a;
    console.log(this.selectedIdGrave);
    console.log("selectid", a);
  }

 // selectGrave : BuyGrave = {id_user: this.LoginID, id_grave: this.selectedIdGrave, paidDay: null, type: null };
 // buyGrave(): void {
    
    //const x = this.ApiService.registerUser(data);
    //console.log(data);
 // } 

 logout(){
  this.ApiService.logOut();
}

}
