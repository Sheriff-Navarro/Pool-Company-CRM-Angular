import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientsService {

  constructor(
    private http: Http
  ) { }

  createClient(componentInfo) {
    return this.http
    .post(
      `${environment.apiBase}/api/new-client`,
      // Form body information to send to the back end (req.body)
      {
      clientFirstName: componentInfo.clientFirstName,
      // clientOwner : componentInfo.clientOwner,
      clientLastName: componentInfo.clientLastName,
      // clientCompanyName: componentInfo.clientCompanyName,
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

getClients() {
  return this.http
  .get(
    `${environment.apiBase}/api/all-clients`,
    { withCredentials: true })
    .map( res => res.json())
    // .toPromise()
    //
    // // Parse the JSON
    // .then(res => res.json()); // close signup()
  }

  delClient(id){
    return this.http
    .delete(
      `${environment.apiBase}/api/client/`+id,
      { withCredentials: true })
      .map( res => res.json())
  }


  getThisClient(id){
    return this.http
    .get(
      `${environment.apiBase}/api/client/`+id,
      { withCredentials: true })
      .map( res => res.json())
  }

  editClient(id, componentInfo){
    return this.http
    .put(
      `${environment.apiBase}/api/client/edit/`+id,
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
}
