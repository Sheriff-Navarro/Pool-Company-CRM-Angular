import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(
    private http: Http
  ) { }

  getUser() {
    return this.http
    .get(
      `${environment.apiBase}/api/user`,
      { withCredentials: true })
      .map( res => res.json());
    }

    updateUser(componentInfo) {
      return this.http
      .put(
        `${environment.apiBase}/api/user/edit`,
        {
          firstName: componentInfo.firstName,
          lastName: componentInfo.lastName,
          companyName: componentInfo.companyName,
          primaryPhone: componentInfo.primaryPhone,
          street1: componentInfo.street1,
          street2: componentInfo.street2,
          city: componentInfo.city,
          province: componentInfo.province,
          zip: componentInfo.zip
        },
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()
      // Parse the JSON
      .then(res => res.json());
    } // close signup()

    deleteUser() {
      return this.http
      .delete(
        `${environment.apiBase}/api/user/delete`,
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()
      // Parse the JSON
      .then(res => res.json());
    } // close signup()


  }
