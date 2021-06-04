import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Cemetery, Corpses } from '../class/Cemetery';
import { MapService } from '../_services/map.service';
import { ApiService } from '../_services/api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;

  private apiUrl =  'http://localhost/cemeteryMap.php';

  corpses: Cemetery[];
  
  constructor(private http: HttpClient,
    private MapService: MapService,
    private ApiService: ApiService) { }
    public loginID;
  ngAfterViewInit(): void {
    this.loginID = this.ApiService.LoginID;
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


  readValues(){
    this.MapService.readValues().subscribe((corpses: Cemetery[])=>{
      this.corpses = corpses;
      console.log(corpses[0]['coor1']);
     })
    console.log("daco ");
  }




  makeMarkers(map: L.map, id): void {
    var greenIcon = L.icon({
      iconUrl: 'http://ukazcicky.mywire.org/cintorin/rip.jpg',
  
      iconSize:     [30, 55], // size of the icon
      iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
  });
    var i=0;
    this.http.get(this.apiUrl).subscribe((res: any) =>{
      var isPaid: Corpses[] = [];
      var notPaid: Corpses[] = [];
      for(const c of res){;
        console.log("ID corpse" ,res[i]['id_corpse'], "ID grave" ,res[i]['id_grave'],"Priezvisko" ,res[i]['lastname']);
        console.log("ID grave" ,res[i]['deadDay']);
        var id_corpse = res[i]['id_corpse'];
        var id_user = res[i]['id_user'];
        var lat1 = res[i]['coor1'];
        var lon1 = res[i]['coor2'];
        var lat2 = res[i]['coor3'];
        var lon2 = res[i]['coor4'];
        var q = new Date();
        var m = q.getMonth();
        var d = q.getDay();
        var y = q.getFullYear();
        var date = new Date(y,m,d);
        var zapl = new Date(res[i]['paidBy']);
        var umr = new Date(res[i]['dead']);
        console.log("umr", id_user);
        var bounds = [[lat1,lon1], [lat2,lon2]];
        
        if(id_user == 0 ){
         // console.log("prazdny volny");
          var marker = L.rectangle(bounds, {color: "#e60000", fillOpacity:100}).addTo(map);
          marker.bindPopup(res[i]['id_grave']+ "Voľné hrobové miesto");
        } 
        if(id_user != 0){
          if(res[i]['name'] != 'nic' || res[i]['lastname'] != 'nic'){
            //zosnuly zaplatene
            if(zapl.getTime() > date.getTime()){
              var marker = L.rectangle(bounds, {color: "#000099", fillOpacity:100}).addTo(map);
              marker.bindPopup(res[i]['id_grave']+ "Meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+ "Dat narodenia: " + res[i]['birth'] + '<br/>' + "Dat úmrtia: " + res[i]['dead']);
            }
  
           if(zapl.getTime() < date.getTime() || isNaN(zapl.getFullYear())){
             //zosnuly nezaplatene
              var marker = L.rectangle(bounds, {color: "#239600", fillOpacity:100}).addTo(map);
              marker.bindPopup( res[i]['id_grave']+ "Meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+ "Dat narodenia: " + res[i]['birth'] + '<br/>' + "Dat úmrtia: " + res[i]['dead']);
            }
  
          }
          if(res[i]['name'] == 'nic' || res[i]['lastname'] == 'nic'){
            //prazdne zaplatene
            if(zapl.getTime() > date.getTime()){
              var marker = L.rectangle(bounds, {color: "#ff9900", fillOpacity:100}).addTo(map);
              marker.bindPopup(res[i]['id_grave']+ "Hrobové miesto s "  + '<br/>'+ " uhradenou zmluvou");
            }
  
            if(zapl.getTime() < date.getTime() || isNaN(zapl.getFullYear())){
              //volne
              var marker = L.rectangle(bounds, {color: "#e60000", fillOpacity:100}).addTo(map);
              marker.bindPopup(res[i]['id_grave']+ "Voľné hrobové miesto");
            }
        }
        else{
          if(id == res[i]['id_corpse'] ){
            console.log("ID OZN" ,res[i]['id_grave']);
            var marker = L.rectangle(bounds, {color: "#000000", fillOpacity:100}).addTo(map);
            marker.bindPopup("Meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']).openPopup()
          }}


        }

        i++;
      } 
    });
  } 

  removeMap(){
    this.map.remove();
  }

  findGrave(data): void {

    var i = 0;
    this.http.get(this.apiUrl).subscribe((res: any) =>{
      for(const c of res){
        var priezvisko = res[i]['lastname'].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var hladaniePriezvisko = data['lastname'].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if(priezvisko.toUpperCase() == hladaniePriezvisko.toUpperCase()){
          var id = res[i]['id_corpse'];
          this.removeMap();
          this.initMap(id);
        }
        else {console.log("nerovna sa");}
        i++;
      }
    });
  }


  sendMails():void{
    this.MapService.sendMails().subscribe((res: any) =>{});
  }

  logout(){
    this.ApiService.logOut();
  }

}
