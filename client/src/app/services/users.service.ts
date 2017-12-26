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
  }
