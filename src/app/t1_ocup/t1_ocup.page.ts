import { Component } from '@angular/core';
import { OcupancyService } from '../services/ocupancy.service';
import { Ocupancy } from '../foodprints/ocupancy';
import { Anchor } from '../foodprints/anchor';
import { InfoAnchorService } from '../services/info-anchor.service';
//Photo
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-t1_ocup',
  templateUrl: 't1_ocup.page.html',
  styleUrls: ['t1_ocup.page.scss']
})
export class T1_ocupPage {
	//Get to data defauld
	colection:any='occupancy';
	document:any='parking2';
	period:any='spring2022';
	//Variables
  ocupancyData: Ocupancy;
  total:number;

 //Update data anchor
  getAnchorData:any;
  anchorData: Anchor;
  AnchorID:any='bBvEFwSGq0VegSOIqmqS';
  getanchprdata:any='';

  hide_municipality:any=true;
  send:boolean=false;
  empty:string='';

  //add photo
  photo:any=false;
  n_photo:number=0;

  constructor(private infoAnchorService: InfoAnchorService, 
    private ocupancyService: OcupancyService,
    public photoService: PhotoService) {

  	this.ocupancyData = {} as Ocupancy;
    this.anchorData = {} as Anchor;
  }
  ionViewWillEnter(){
    this.AnchorID=this.infoAnchorService.getAnchor()
    this.ocupancyService.getanchor("parkinginfo",this.AnchorID).subscribe((resultado) => {
      if(resultado.data() != null) {
        this.getAnchorData=resultado.data()
        this.ocupancyData["capacity"]=this.getAnchorData["capacity"];
    }})
  	this.ocupancyData["bikes"]=0;
  	this.ocupancyData["kidbikes"]=0;
  	this.ocupancyData["abandonedbikes"]=0;
  	this.ocupancyData["sharedbikes"]=0;

    this.ocupancyData["municipality"];
    this.ocupancyData["foto"];
    document.getElementById('municipality').hidden=true;
  }
  show(item:any){
    var element=document.getElementById(item).hidden;
    if(element==true){
      document.getElementById(item).hidden=false;
    }else{
      document.getElementById(item).hidden=true;
    }
  }
  clicBotonInsertar() {
    

    //We calculate the total number of bikes registered.
    this.total=this.ocupancyData["bikes"]+this.ocupancyData["kidbikes"]+this.ocupancyData["abandonedbikes"]+this.ocupancyData["sharedbikes"];
    console.log(this.total);
    
    if(this.total>=1){
      this.send=true;

    }else{
      if(this.empty=='Yes'){
        this.send=true;
      }else{
        
        alert("The total number of bicycles was 0, please press the button again if there weren't any bicycles.")
        this.send=false;
        this.empty='Yes'
      }
    }
    //We check if it's empty 
    if(this.send==true){
    //We send the occupancy data
      this.ocupancyService.insertar(this.colection,this.AnchorID,this.period, this.ocupancyData).then(() => {
        console.log('Occupancy creada correctamente!');
        this.ocupancyData= {} as Ocupancy;
      }, (error) => {
        console.error(error);
      });
      this.ocupancyService.getanchor("parkinginfo",this.AnchorID).subscribe((resultado) => {
        if(resultado.data() != null) {
          this.getanchprdata=resultado.data();
          //we assign the recovered values to its correonding 
          this.anchorData.AVGoccupancy=this.getanchprdata["AVGoccupancy"];
          this.anchorData.MAXoccupancy=this.getanchprdata["MAXoccupancy"];
          this.anchorData.capacity=this.ocupancyData["capacity"]
          this.anchorData.place=this.getanchprdata["place"];
          this.anchorData.foto=this.getanchprdata["foto"];
          this.anchorData.registers=this.getanchprdata["registers"];
          //We update the values if necessary
          if(this.hide_municipality==false){
            this.anchorData.place=this.ocupancyData["municipality"]
            console.log("mun2");
          }
          //Upload photo
          if(this.photo==true){
            this.photoService.upload(this.AnchorID);
            this.anchorData.foto=this.photoService.getfilename()
          }
          if((typeof(this.total)=='number')&&(this.total>=0)){
            this.anchorData.AVGoccupancy=((this.anchorData.AVGoccupancy*this.anchorData.registers)+this.total)/(this.anchorData.registers+1);
            this.anchorData.registers=this.anchorData.registers+1;
            if(this.anchorData.MAXoccupancy<this.total){
              this.anchorData.MAXoccupancy=this.total;
            }
        }
          this.ocupancyService.actualizar("parkinginfo",this.AnchorID, this.anchorData).then(() => {
              this.anchorData= {} as Anchor;
            }, (error) => {
              console.error(error);
            });            
       }
           
  
           
           var pagebutton=document.getElementById("cancel");
            pagebutton.click();
            //Hide cap and mun on submit
            //document.getElementById('capacity').hidden=true;
            //document.getElementById('municipality').hidden=true;
      })
    }
    //We get the data from the anchor.
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

