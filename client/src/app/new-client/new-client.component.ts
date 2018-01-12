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

  FormData = {
    clientFirstName: '',
    clientLastName: '',
    // clientCompanyName: '',
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
      // If success, we are logged in.
      // .then((resultFromApi) => {
      //     // this.router.navigate(['/app/dashboard']);
      // })
      // Even if you don't do anything on error, catch to avoid a console error.
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
          // clientCompanyName: '',
          clientUsername: '',
          clientPrimaryPhone: '',
          clientStreet1: '',
          clientStreet2: '',
          clientCity: '',
          clientProvince: '',
          clientZip: '',
          };
          // this.router.navigate(['/app/client/details/'+createdClientId]);
          this.router.navigate(['/app/client']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.errorMessage = parsedError.message + ' ';
      });
  } // close doSignUp()

}
