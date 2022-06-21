import { Component,  OnInit } from '@angular/core';
import { InfoAnchorService } from '../services/info-anchor.service';
import { GetAnchorDataService } from '../services/get-anchor-data.service';


//New attemp


import { OcupancyService } from '../services/ocupancy.service';
import { Ocupancy } from '../foodprints/ocupancy';
import { Anchor } from '../foodprints/anchor';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-t1_anchor',
  templateUrl: 't1_anchor.page.html',
  styleUrls: ['t1_anchor.page.scss']
})
export class T1_anchorPage {

  anchors: any='';
  anchor: any='';
  anchorID: any='';
  previousID:any='';
  test: any='place1';
  //test
  anchorData: any='';
  constructor(private infoAnchorService: InfoAnchorService, 
    private getAnchorDataService: GetAnchorDataService,
    private ocupancyService: OcupancyService) { }
  ionViewWillLeave(): void{
    this.previousID=this.anchorID;
  }
  ionViewWillEnter(): void{
    //Hide and show content
    const content = document.getElementById('content');
    content.hidden=true;
    const gif = document.getElementById('gif');
    gif.hidden=false;
    this.anchorID=this.infoAnchorService.getAnchor()
    if(this.anchorID!=this.previousID){
      const img = document.getElementById('myimg');
      img.setAttribute('src', '');
    }
    this.ocupancyService.getanchor("parkinginfo",this.anchorID).subscribe((resultado) => {
      this.anchorData=resultado.data();

      if(this.anchorData.foto=='assets/icon/NA_IM.jpeg'){
        const img = document.getElementById('myimg');
        img.setAttribute('src', this.anchorData.foto);
      }else{
        const storage = getStorage();
        getDownloadURL(ref(storage, this.anchorID+'/'+this.anchorData.foto))
          .then((url) => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
          })
          .catch((error) => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', this.anchorData.foto);
          });
      }
      this.show('gif')
      this.show('content')
    });

  }


/*
    this.anchorID=this.infoAnchorService.getAnchor()

        this.getAnchorDataService.getInfoAnchors()
      .subscribe((resp:any) =>{
        this.anchors=resp;
        for( let x in this.anchors) {
          if(this.anchorID==x){
            this.anchor=this.anchors[this.anchorID];
          }
        }
      });
*/
    

  show(item:any){
    var element=document.getElementById(item).hidden;
    if(element==true){
      document.getElementById(item).hidden=false;
    }else{
      document.getElementById(item).hidden=true;
    }
  }
} 
 



 