import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientsService {

  constructor(
    private http: Http
  ) { }

  //GET ALL-----------------------------------------------------------------
  getClients() {
  return this.http
  .get(
    `${environment.apiBase}/api/client/all`,
    { withCredentials: true })
    .map( res => res.json())
  }

  //GET ONE-----------------------------------------------------------------
  getThisClient(id){
  return this.http
  .get(
    `${environment.apiBase}/api/client/`+id,
    { withCredentials: true })
    .map( res => res.json())
  }

  //CREATE------------------------------------------------------------------
  createClient(componentInfo) {
  return this.http
  .post(
    `${environment.apiBase}/api/client/new`,
    {
      clientFirstName: componentInfo.clientFirstName,
      clientLastName: componentInfo.clientLastName,
      clientPrimaryPhone: componentInfo.clientPrimaryPhone,
      clientUsername: componentInfo.clientUsername,
      clientStreet1: componentInfo.clientStreet1,
      clientStreet2: componentInfo.clientStreet2,
      clientCity: componentInfo.clientCity,
      clientProvince: componentInfo.clientProvince,
      clientZip: componentInfo.clientZip,
    },
    // Send the cookies across domains
    { withCredentials: true }
  )
  // Convert from observable to promise
  .toPromise()
  // Parse the JSON
  .then(res => res.json());
}

//EDIT--------------------------------------------------------------------
editClient(id, componentInfo){
return this.http
.put(
  `${environment.apiBase}/api/client/`+id,
  {
    clientFirstName: componentInfo.clientFirstName,
    clientLastName: componentInfo.clientLastName,
    clientUsername: componentInfo.clientUsername,
    clientPrimaryPhone: componentInfo.clientPrimaryPhone,
    clientStreet1: componentInfo.clientStreet1,
    clientStreet2: componentInfo.clientStreet2,
    clientCity: componentInfo.clientCity,
    clientProvince: componentInfo.clientProvince,
    clientZip: componentInfo.clientZip
  },
  // Send the cookies across domains
  { withCredentials: true })
  .map( res => res.json())
}

//DELETE------------------------------------------------------------------
delClient(id){
return this.http
.delete(
  `${environment.apiBase}/api/client/`+id,
  { withCredentials: true })
  .map( res => res.json())
}

}
