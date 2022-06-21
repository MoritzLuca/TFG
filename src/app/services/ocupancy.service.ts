import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class OcupancyService {

  constructor(private angularFirestore: AngularFirestore) { }
  public insertar(coleccion:any, document:any, period:any, data:any) {
    return this.angularFirestore.collection(coleccion).doc(document).collection(period).add(data);
  }
  public actualizar(coleccion:any, documentId:any, datos:any) {
	return this.angularFirestore.collection(coleccion).doc(documentId).set(datos);
  }
	public getanchor(coleccion:any, documentId:any) {
	  return this.angularFirestore.collection(coleccion).doc(documentId).get();
	}	
  public getanchors(coleccion:any) {
    return this.angularFirestore.collection(coleccion).get();
  }  
  public createAnchor(collection:any, documentId:any, datos:any) {
  return this.angularFirestore.collection(collection).doc(documentId).set(datos);
  }  
//return this.angularFirestore.collection("occupancy").document(document).collection(coleccion).add(datos);
  

}
