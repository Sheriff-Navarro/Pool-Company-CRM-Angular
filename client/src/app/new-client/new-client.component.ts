import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../services/users.service';
import {AuthService} from '../services/auth.service';
import {ClientsService} from '../services/clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})

export class NewClientComponent implements OnInit {
  errorMessage: string;
  toRouteId: string;

  FormData = {
    clientFirstName: '',
    clientLastName: '',
    clientPrimaryPhone: '',
    clientUsername: '',
    clientStreet1: '',
    clientStreet2: '',
    clientCity: '',
    clientProvince: '',
    clientZip: '',
  };

  constructor(
    private AuthService: AuthService,
    private ClientsService: ClientsService,
    private router: Router,
    private UsersService: UsersService
  ) { }

  ngOnInit() {
    this.AuthService.checklogin()
      .catch((err) => {
      this.router.navigate(['/app/login']);
      });
  }

  doCreateClient() {
    this.FormData.clientFirstName = this.FormData.clientFirstName.trim();
    if (!this.FormData.clientFirstName){
      this.FormData.clientFirstName = "(Not Specified)";
    }

    this.ClientsService.createClient(this.FormData)
      .then((createdClientId: string) => {
          this.FormData = {
          clientFirstName: '',
          clientLastName: '',
          clientUsername: '',
          clientPrimaryPhone: '',
          clientStreet1: '',
          clientStreet2: '',
          clientCity: '',
          clientProvince: '',
          clientZip: '',
          };
          // this.router.navigate(['/app/client/details/'+this.toRouteId]);
          this.router.navigate(['/app/client']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.errorMessage = parsedError.message + ' ';
      });

  } // close doSignUp()

}
