import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

import { InfoAnchorService } from '../services/info-anchor.service';
import { GetAnchorDataService } from '../services/get-anchor-data.service';
//Change
import { OcupancyService } from '../services/ocupancy.service';
import { Ocupancy } from '../foodprints/ocupancy';
import { Anchor } from '../foodprints/anchor';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: Leaflet.Map;
  propertyList = [];
  test: any='place2';
  test2:any=''
  lastlat:any='';
  lastlong:any='';
  coordenates:any='N';
  update:any;

  constructor(private infoAnchorService: InfoAnchorService,
    private getAnchorDataService: GetAnchorDataService,
    private ocupancyService: OcupancyService    ) {
    }

  ionViewWillLeave(){
    var pagebutton=document.getElementById("selfclick");
    var value=pagebutton.getAttribute('value')
    this.infoAnchorService.setAnchor(value);
  }



  ionViewDidEnter() {
    this.update=this.infoAnchorService.getUpdate();
    this.cargar();    
  }



  cargar(){
    if(this.update=='Y'){
      this.map.remove();
      this.createmap();
      this.infoAnchorService.setUpdate('');
    }else if (this.map) {
      this.loadmap();
    }else {
      this.createmap();
    }
       
  }
  loadmap(){
  }
  createmap(){
    this.map = new Leaflet.Map('mapId4').fitWorld();
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'uab.cat'
    }).addTo(this.map);
    var blueIcon = Leaflet.icon({
     iconUrl: 'assets/icon/bicycle.png',
     iconSize:     [32, 32],  // size of the icon
     iconAnchor:   [16, 32] // point of the icon which will correspond to marker's location});
     });

  this.map.locate({
    setView: true,
    maxZoom: 15
    }).on('locationfound', (e) => {
    this.lastlat=e.latitude;
    this.lastlong=e.longitude;
    this.coordenates='Y';
    let markerGroup = Leaflet.featureGroup();
    let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon: blueIcon})
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);
    this.map.setZoom(15);
    this.infoAnchorService.setLocation(e.latitude, e.longitude)
    }).on('locationerror', (err) => {
    this.map.setView([this.lastlat, this.lastlong], 15);    
    //alert(err.message);
       
    })
    var redIcon = Leaflet.icon({
     iconUrl: 'assets/icon/anchor.png',
     iconSize:     [32, 32],  // size of the icon
     iconAnchor:   [16, 32] // point of the icon which will correspond to marker's location});
     });
    this.ocupancyService.getanchors("anchors").subscribe((resultado) => {
      const test = resultado;
      test.forEach(doc => {
        this.propertyList[doc.id]=doc.data()
        var values =this.propertyList[doc.id];
        Leaflet.marker([values.lat, values.long], {icon: redIcon}).addTo(this.map)
          .on('click', function(e){
            var pagebutton=document.getElementById("selfclick");
            pagebutton.setAttribute('value',values.ID)
            pagebutton.click();
          } )
        } )
})
  } 
} 