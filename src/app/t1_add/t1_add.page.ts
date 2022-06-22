//Author: Luca Moritz Liborio Liebscht
import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

import { OcupancyService } from '../services/ocupancy.service';
import { Ocupancy } from '../foodprints/ocupancy';
import { AnchorREF } from '../foodprints/anchorREF';
import { Anchor } from '../foodprints/anchor';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//Send update
import { InfoAnchorService } from '../services/info-anchor.service';
import { WeatherAPIService } from '../services/weather-api.service';
//Photos
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-t1_add',
  templateUrl: 't1_add.page.html',
  styleUrls: ['t1_add.page.scss']
})
export class T1_addPage{
  map1: Leaflet.Map;
  lat:any='';
  lon:any='';
  newAnchor: Anchor;
  newAnchorREF: AnchorREF;
  update:any='N';
  ID:string='';
  Icon = Leaflet.icon({
    iconUrl: 'assets/icon/mark.png',
    iconSize:     [50, 50],  // size of the icon
    iconAnchor:   [25, 50] // point of the icon which will correspond to marker's location});
    });
  marker: any = Leaflet.marker([this.lat,this.lon], {icon: this.Icon}).on('click', () => {
      alert('I am Here!');})
  adress:any;


    //add photo
    photo:any=false;
    n_photo:number=0;
  constructor(private infoAnchorService: InfoAnchorService,private ocupancyService: OcupancyService, 
    private angularFirestore: AngularFirestore,public wAPI:WeatherAPIService,
    public photoService: PhotoService) {
    this.newAnchor = {} as Anchor;
    this.newAnchorREF = {} as AnchorREF;
  }
 ionViewDidEnter() {
  var location:any=this.infoAnchorService.getLocation();
  this.lat=location.lat;
  this.lon=location.lon;
  this.photo=false;

  this.cargar();

  }
  cargar(){
    if (this.map1) {
      this.map1.remove();
    }
    this.leafletMap();
    // his.getData();
  } 

  leafletMap() {
    this.map1 = Leaflet.map('mapId').setView([this.lat,this.lon], 15);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'uab.cat | © Angular LeafLet',
    }).addTo(this.map1);
    this.marker.setLatLng([this.lat, this.lon],{draggable:'true'}).update();
    let markerGroup = Leaflet.featureGroup();
    markerGroup.addLayer(this.marker);
    this.map1.addLayer(markerGroup);
  }
  locate(){

      this.map1.locate({
        setView: true
        }).on('locationfound', (e:any) => {
        this.lat=e.latitude;
        this.lon=e.longitude;
        this.Icon.options.iconUrl= 'assets/icon/mark3.png',
        this.marker.setIcon(this.Icon);
        this.marker.setLatLng([this.lat, this.lon]).update();
        this.map1.setZoom(20);
        }).on('locationerror', (err) => {
          alert("We weren't able to determine your location. Please make sure that your location and mobile connection are active and working.")
        this.map1.setView([41.50053239592097,2.111917734146118], 15);    
           
        })
  }
  async addAnchor(){
    //Create ID
    /*
    const res = {
      id:'0_Testing'}
      */

    const res = await this.angularFirestore.collection('anchors').add({
      name: 'In process',
      country: 'Delete'
    });
    console.log('Added document with ID: ', res.id);
    this.ID = res.id
    //Get muni
    this.wAPI.getMuni(this.lat,this.lon)
      .subscribe((resp:any)=>{
        this.adress=resp.address;
        if(this.adress.town){
          this.newAnchorREF["place"]=this.adress.town;
          this.newAnchor["place"]=this.adress.town;
        }else if(this.adress.village){
          this.newAnchorREF["place"]=this.adress.village;
          this.newAnchor["place"]=this.adress.village;
        }else if(this.adress.neighbourhood){
          this.newAnchorREF["place"]=this.adress.neighbourhood;
          this.newAnchor["place"]=this.adress.neighbourhood;
        }else if(this.adress.county){
          this.newAnchorREF["place"]=this.adress.county;
          this.newAnchor["place"]=this.adress.county;
        } else{
          this.newAnchorREF["place"]='Undefined';
          this.newAnchor["place"]='Undefined';
        }
        //New anchor
        this.newAnchor["IDanchor"]=this.ID;
        this.newAnchor["AVGoccupancy"]=0;
        this.newAnchor["MAXoccupancy"]=0;
        this.newAnchor["capacity"]=0;
        if(this.photo){
          this.photoService.create(this.ID);
          this.newAnchor["foto"]='default.jpeg'
        }else{
          this.newAnchor["foto"]='assets/icon/NA_IM.jpeg';
        }
        this.newAnchor["registers"]=0;
        console.log(this.newAnchor)
        this.ocupancyService.createAnchor("parkinginfo",this.ID,this.newAnchor)
        //New anchor reference
        this.newAnchorREF["ID"]=this.ID;
        this.newAnchorREF["long"]=this.lon;
        this.newAnchorREF["lat"]=this.lat;
        console.log(this.adress);
        
        this.ocupancyService.createAnchor("anchors",this.ID,this.newAnchorREF)
        console.log(this.newAnchorREF)
        var pagebutton=document.getElementById("cancel");
        this.update='Y';
        this.infoAnchorService.setUpdate('Y');
        pagebutton.click();
      })

  }
  show(item:string){
    var element=document.getElementById(item).hidden;
    if(element==true){
      document.getElementById(item).hidden=false;
    }else{
      document.getElementById(item).hidden=true;
    }
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.photo=true;
    this.n_photo=this.n_photo+1
    if(this.n_photo>=2){
      this.show('fotos')
    }
  }
}
 

