import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientServiceService {

  constructor(
    private http: Http
  ) { }

  //GET ALL-----------------------------------------------------------------
  getServices() {
  return this.http
  .get(
    `${environment.apiBase}/api/service/all`,
    { withCredentials: true })
    .map( res => res.json())
  }

  createService(componentInfo, clientId) {
    return this.http
    .post(
      `${environment.apiBase}/api/service/new/`+clientId,
      {
        clientFirstName: componentInfo.serviceName,
        clientLastName: componentInfo.serviceDescription,
        clientPrimaryPhone: componentInfo.servicePrice
      },
      // Send the cookies across domains
      { withCredentials: true }
    )
    // Convert from observable to promise
    .toPromise()
    // Parse the JSON
    .then(res => res.json());
}

}
