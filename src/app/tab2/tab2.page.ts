import { Component } from '@angular/core';
import { OcupancyService } from '../services/ocupancy.service';
import { Anchor } from '../foodprints/anchor';
import { PhotoService } from '../services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService) {}

  
	addPhotoToGallery() {
	  this.photoService.addNewToGallery();
	}

  
}


