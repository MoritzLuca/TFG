//Author: Luca Moritz Liborio Liebscht
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();
const storageRef = ref(storage, 'last-added-photo');
const storageRef2 = ref(storage, 'fuck_the_system');
var theblob;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
	public photos: UserPhoto[] = [];
	filename:any='';
  constructor() {
   }

public async create(reference:any){
	var storageRef = ref(storage, reference+'/default.jpeg');
	uploadBytes(storageRef, theblob).then((snapshot) => {
		console.log('Uploaded a blob or file!');
	});
};
public async upload(reference:any){
	this.filename = new Date().getTime() + '.jpeg';
	var storageRef = ref(storage, reference+'/'+this.filename);
	uploadBytes(storageRef, theblob).then((snapshot) => {
		console.log('Uploaded a blob or file!');
	});	
};
public getfilename(){
	return this.filename;
}
private async readAsBase64(photo: Photo) {
	// Fetch the photo, read as a blob, then convert to base64 format
	const response = await fetch(photo.webPath!);
	const blob = await response.blob();
	// 'file' comes from the Blob or File API
	theblob=blob;
	uploadBytes(storageRef, blob).then((snapshot) => {
	  console.log('Uploaded a blob or file!');
	});
	return await this.convertBlobToBase64(blob) as string;
}

private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.onerror = reject;
	reader.onload = () => {
	  resolve(reader.result);
	};
	reader.readAsDataURL(blob);
});

private async savePicture(photo: Photo) {
	// Convert photo to base64 format, required by Filesystem API to save
	const base64Data = await this.readAsBase64(photo);

	// Write the file to the data directory
	const fileName = new Date().getTime() + '.jpeg';
	const savedFile = await Filesystem.writeFile({
	path: fileName,
	data: base64Data,
	directory: Directory.Data
	});

	// Use webPath to display the new image instead of base64 since it's
	// already loaded into memory
	return {
	filepath: fileName,
	webviewPath: photo.webPath
	}; 
}

  public async addNewToGallery() {
  // Take a photo
	const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
	  });

	const savedImageFile = await this.savePicture(capturedPhoto);
	this.photos.unshift(savedImageFile); 
	}

}
export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}




// 'file' comes from the Blob or File API





