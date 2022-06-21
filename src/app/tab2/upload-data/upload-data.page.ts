import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OcupancyService } from '../../services/ocupancy.service';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.page.html',
  styleUrls: ['./upload-data.page.scss'],
})
export class UploadDataPage implements OnInit {
  propertyList = [];
  test:any;
  private _jsonURL = 'assets/Data/geo_json.json';
  constructor(private http: HttpClient,
    private ocupancyService: OcupancyService,
    private angularFirestore: AngularFirestore) {
    this.getJSON().subscribe(data => {
      
      this.propertyList=data.features;
      console.log(this.propertyList);
      console.log(this.propertyList[0]);

     });
   }
   public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {

    /*
    fetch('./assets/Data/geo_json.json')
    .then(res => {
      this.test=res.json()
      console.log(this.test);
      console.log(this.test.type);
    })
    */
  }/*
  async upload_data(){
      var data=this.propertyList[0]
      var anchor = {
        ID:'',
        lat:data.geometry.coordinates[1],
        long:data.geometry.coordinates[0],
        place:data.properties.Barrio
      }
      var info = {
        ID_gis:data.properties.Gis_ID,
        AVGoccupancy:data.properties.sumOcc,
        MAXoccupancy:data.properties.sumOcc,
        capacity:0,
        foto:'assets/icon/NA_IM.jpeg',
        place:data.properties.Barrio,
        registers:0
      }
      const res = await this.angularFirestore.collection('anchors').add(anchor);
      this.ocupancyService.createAnchor("parkinginfo",res.id,info)
      anchor['ID']=res.id
      this.ocupancyService.createAnchor("anchors",res.id,anchor)
            
    

  }*/
  async upload_data(){
    for (const data of this.propertyList) {
      var anchor = {
        ID:'',
        lat:data.geometry.coordinates[1],
        long:data.geometry.coordinates[0],
        place:data.properties.Barrio
      }
      var info = {
        ID_gis:data.properties.Gis_ID,
        AVGoccupancy:data.properties.sumOcc,
        MAXoccupancy:data.properties.sumOcc,
        capacity:0,
        foto:'assets/icon/NA_IM.jpeg',
        place:data.properties.Barrio,
        registers:0
      }
      const res = await this.angularFirestore.collection('anchors').add(anchor);
      this.ocupancyService.createAnchor("parkinginfo",res.id,info)
      anchor['ID']=res.id
      this.ocupancyService.createAnchor("anchors",res.id,anchor)
            
    }
    console.log("Finished loading");
    

  }

}

