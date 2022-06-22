//Author: Luca Moritz Liborio Liebscht
import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class GetAnchorDataService {

  constructor(private http:HttpClient) { }
  getInfoAnchors(){
  	return this.http.get("https://bikeuab-8c806-default-rtdb.europe-west1.firebasedatabase.app/anchorsInfo.json");
	}
  getIDAnchors(){
  	return this.http.get("https://bikeuab-8c806-default-rtdb.europe-west1.firebasedatabase.app/anchors/UAB.json");
	}	


}




















