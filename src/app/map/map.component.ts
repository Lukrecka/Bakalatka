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

    //title.addTo(this.map);
    /*
    var bounds = [[48.172988747687844, 17.79615612791936],[48.17296658961036, 17.79613399969547]];    
    var bounds4 =[[48.172988747687844, 17.79620373882787],[48.17296658961036, 17.796181610603988]]; 
    var bounds2 = [[48.17280703792287, 17.79620373882787],[48.17278615065479, 17.796181610603988]];  
    var bounds1 = [[48.17285747687844, 17.79620373882787],[48.17283658961036, 17.796181610603988]];   
    var bounds3 = [[48.17285747687844, 17.79622009506664],[48.17283658961036, 17.7962459907196]];     
    var bounds5 = [[48.172988747687844, 17.79611612791936],[48.17296658961036, 17.79609399969547]];    
    var bounds6 =[[48.172988747687844, 17.79624373882787],[48.17296658961036, 17.796221610603988]]; 
    var bounds7 = [[48.172988747687844, 17.79628373882787],[48.17296658961036, 17.796261610603988]];    
    var bounds8 =[[48.172988747687844, 17.79632373882787],[48.17296658961036, 17.796301610603988]]; 
    var bounds9 = [[48.172938747687844, 17.79615612791936],[48.17291658961036, 17.79613399969547]];    
    var bounds10 =[[48.172938747687844, 17.79620373882787],[48.17291658961036, 17.796181610603988]];
    var bounds11 = [[48.172938747687844, 17.79628373882787],[48.17291658961036, 17.796261610603988]];    
    var bounds12 =[[48.172938747687844, 17.79632373882787],[48.17291658961036, 17.796301610603988]];
    var bounds13 =[[48.172938747687844, 17.79611612791936],[48.17291658961036, 17.79609399969547]];
    var bounds14 =[[48.172938747687844, 17.79636373882787],[48.17291658961036, 17.796341610603988]];
    var bounds15 =[[48.172938747687844, 17.79624373882787],[48.17291658961036, 17.796221610603988]];
    
    var rectangle = L.rectangle(bounds,{color: "#0000ff", fillOpacity:100}).addTo(this.map);
    var rectangle1 = L.rectangle(bounds1,{color: "#ff0066", fillOpacity:100}).addTo(this.map); 
    var rectangle2 = L.rectangle(bounds2,{color: "#66ff33", fillOpacity:100}).addTo(this.map);  
    var rectangle3 = L.rectangle(bounds3,{color: "#ff0066", fillOpacity:100}).addTo(this.map)
    var rectangle4 = L.rectangle(bounds4,{color: "#000000", fillOpacity:100}).addTo(this.map);
    var rectangle5 = L.rectangle(bounds5,{color: "#0000ff", fillOpacity:100}).addTo(this.map);
    var rectangle6 = L.rectangle(bounds6,{color: "#ff0066", fillOpacity:100}).addTo(this.map); 
    var rectangle7 = L.rectangle(bounds7,{color: "#66ff33", fillOpacity:100}).addTo(this.map);  
    var rectangle8 = L.rectangle(bounds8,{color: "#ff0066", fillOpacity:100}).addTo(this.map)
    var rectangle9 = L.rectangle(bounds9,{color: "#000000", fillOpacity:100}).addTo(this.map);
    var rectangle10 = L.rectangle(bounds10,{color: "#0000ff", fillOpacity:100}).addTo(this.map);
    var rectangle11 = L.rectangle(bounds11,{color: "#ff0066", fillOpacity:100}).addTo(this.map); 
    var rectangle12 = L.rectangle(bounds12,{color: "#66ff33", fillOpacity:100}).addTo(this.map);  
    var rectangle13 = L.rectangle(bounds13,{color: "#ff0066", fillOpacity:100}).addTo(this.map)
    var rectangle14 = L.rectangle(bounds14,{color: "#000000", fillOpacity:100}).addTo(this.map);
    var rectangle15 = L.rectangle(bounds15,{color: "#000000", fillOpacity:100}).addTo(this.map);
    */
    //var marker = L.marker([48.229384,17.717559]).addTo(this.map);
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
        //console.log("ID corpse" ,res[i]['id_corpse']);
        //console.log("ID grave" ,res[i]['id_grave']);
        var id_corpse = res[i]['id_corpse'];
        var lat1 = res[i]['coor1'];
        var lon1 = res[i]['coor2'];
        var lat2 = res[i]['coor3'];
        var lon2 = res[i]['coor4'];
        var q = new Date();
        var m = q.getMonth();
        var d = q.getDay();
        var y = q.getFullYear();
        var date = new Date(y,m,d);
        //console.log(date.getTime());
        var zapl = new Date(res[i]['paidBy']);
        var umr = new Date(res[i]['dead']);
        //console.log("umr", umr);
        //console.log("zapl", zapl);
        //console.log("zapl", zapl.getTime());
        var bounds = [[lat1,lon1], [lat2,lon2]];
        
        if(id_corpse == null){
          console.log("prazdny volny");
          var marker = L.rectangle(bounds, {color: "#00ff00", fillOpacity:100}).addTo(map);
          marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"prazdny volny")

        }
        else{
          if(id == res[i]['id_corpse'] ){
            console.log("ID OZN" ,res[i]['id_grave']);
            var marker = L.rectangle(bounds, {color: "#000000"}).addTo(map);
            marker.bindPopup("Meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"SOM OZNACENY").openPopup()
          }
          else if( !isNaN(zapl.getFullYear()) && !isNaN(umr.getFullYear()) ){
            console.log("lon1",lon1,"lat1",lat1,"lon2",lon2,"lat2",lat2);
            console.log("plny zaplateny");
            if(zapl.getTime() > date.getTime()){
              isPaid.push(res[i]);
              //var marker = L.rectangle(bounds, {color: "#ffff00", fillOpacity:100}).addTo(map);
              //marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"plny zaplateny")
            }
            else if(zapl.getTime() < date.getTime()){
              var marker = L.rectangle(bounds, {color: "#000099", fillOpacity:100}).addTo(map);
              marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"plny nezaplateny")
            }
          }
          else if( isNaN(zapl.getFullYear()) && isNaN(umr.getFullYear()) ){
            console.log("prazdny volny");
            var marker = L.rectangle(bounds, {color: "#00ff00", fillOpacity:100}).addTo(map);
            marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"prazdny volny")
          }
          else if( !isNaN(zapl.getFullYear()) && isNaN(umr.getFullYear()) ){
           console.log("prazdny zaplateny");
           if(zapl.getTime() > date.getTime()){
            var marker = L.rectangle(bounds, {color: "#ff0066", fillOpacity:100}).addTo(map);
            marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"volny zaplateny")
            }
            else if(zapl.getTime() < date.getTime()){
            var marker = L.rectangle(bounds, {color: "#000099", fillOpacity:100}).addTo(map);
            marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"plny nezaplateny")
            }
          }
          else if( isNaN(zapl.getFullYear()) && !isNaN(umr.getFullYear()) ){
            //console.log("plny nezaplateny");
            var marker = L.rectangle(bounds, {color: "#000099", fillOpacity:100}).addTo(map);
            marker.bindPopup("meno: " + res[i]['name'] + '<br/>'+ "priezvisko: " + res[i]['lastname']+ '<br/>'+"plny nezaplateny")
          } 
        }
        i++;
      } 
      console.log(isPaid.length);
// viac ako jeden mrtvy v hrobe
      var a: any[] = [];
      
      for (i = 0; i < isPaid.length; i++) {
         a.push( `
              <table  border='1' width='100%' style='border-collapse: collapse;'>
             <td>`+ isPaid[i]['name'] + `</td>
            <td> ` +isPaid[i]['lastname'] + `</td>
             </tr>
          </table>`)
      }
    
  var marker = L.rectangle(bounds, {color: "#ffff00", fillOpacity:100}).addTo(map);
     marker.bindPopup("meno: " + a + "plny zaplateny")

    });
  } 

  removeMap(){
    this.map.remove();
  }

  findGrave(data): void {

    var i = 0;
    this.http.get(this.apiUrl).subscribe((res: any) =>{
      for(const c of res){
       // console.log(res[i]['lastname']);
        var priezvisko = res[i]['lastname'].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var hladaniePriezvisko = data['lastname'].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
       // console.log(hladaniePriezvisko);
      //  console.log(priezvisko);
        if(priezvisko.toUpperCase() == hladaniePriezvisko.toUpperCase()){
          var id = res[i]['id_corpse'];
        //  console.log("rovna sa", id);
          this.removeMap();
          this.initMap(id);
        }
        else {console.log("nerovna sa");}
        i++;
      }
    });
   // console.log("poslane data" ,data['lastname']);
  }


  sendMails():void{
    this.MapService.sendMails().subscribe((res: any) =>{});
  }

  logout(){
    this.ApiService.logOut();
  }

}
