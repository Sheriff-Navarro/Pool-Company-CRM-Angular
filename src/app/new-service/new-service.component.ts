import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientsService} from '../services/clients.service';
import {ClientServiceService} from '../services/client-service.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit {

  clientArray: any[] = [];
  errorMessage: string;
  createErrorMessage: string;
  selectedClientId: '';

  FormData = {
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
  };

  constructor(
    private AuthService: AuthService,
    private ClientsService: ClientsService,
    private ClientServiceService: ClientServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.AuthService.checklogin()
    .catch((err) => {
      this.router.navigate(['/app/login']);
    });
    this.ClientsService.getClients()
    .subscribe(
      (clientList) => {
        console.log("ALL THE CLIENTSSSS", clientList)
        this.clientArray = clientList;
      },
      () => {
        this.errorMessage = 'Something went wrong.';
      });
    }

    getClientIdFromSelect(id){
      console.log('selected client Id: ', id)
      this.selectedClientId = id;
    }

    doCreateService() {
      console.log('in doCreateService, selected client Id is: ',this.selectedClientId)

      this.FormData.serviceName = this.FormData.serviceName.trim();
      if (!this.FormData.serviceName){
        this.FormData.serviceName = "(Not Specified)";
      }

      this.ClientServiceService.createService(this.FormData, this.selectedClientId)
        .then((createdClientId: string) => {
            this.FormData = {
              serviceName: '',
              serviceDescription: '',
              servicePrice: '',
            };
            this.router.navigate(['/app/client/details',this.selectedClientId]);
        })
        .catch((err) => {
            const parsedError = err.json();
            this.createErrorMessage = parsedError.message + ' ';
        });

    } // close doSignUp()


  }
