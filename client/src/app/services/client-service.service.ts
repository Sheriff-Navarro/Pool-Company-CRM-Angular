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


}
