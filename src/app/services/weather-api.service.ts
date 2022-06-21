import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private http:HttpClient) { }


  getMuni(lat:any,lng:any){
    return this.http.get('https://geocode.maps.co/reverse?lat='+lat+'&lon='+lng)
    
  }
}
