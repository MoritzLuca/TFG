import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class InfoAnchorService {
  info: any='';
  update: any='';
  location:object={
    lat:0,
    lon:0
  };
  constructor(private http:HttpClient) { }
  getAnchors(){
  	//console.log("getAnchors")
  	return this.http.get('assets/Data/anchor.json');
  }
  setAnchor(ID:any){
  	this.info=ID;
  	//console.log("setAnchor");
  }
  getAnchor(){
    //console.log("getAnchor"); 
  	return this.info;
  }
  setUpdate(value:any){
    this.update=value;
  }
  getUpdate(){
    return this.update;
  }
  setLocation(lat:number,lon:number){
    this.location={
      lat:lat,
      lon:lon
    }
  }
  getLocation(){
    return this.location;
  }
}