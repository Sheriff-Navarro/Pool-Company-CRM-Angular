import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientsService} from '../services/clients.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent implements OnInit {
  isLoggedOut: boolean = false;
  clientArray: any[] = [];
  clientListError: string;

  constructor(
    private AuthService: AuthService,
    private ClientsService: ClientsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.AuthService.checklogin()
          .catch((err) => {
          this.isLoggedOut = true;
      });

      this.ClientsService.getClients()
        .subscribe(
          (clientList) => {
              this.clientArray = clientList;
          },
          () => {
              this.clientListError = 'No clients yet.';
          });
  }


  getTheClients() {
    // this.ClientsService.getClients()
    //   .subscribe(
    //     (clientList) => {
    //         this.clientArray = clientList;
    //     },
    //     () => {
    //         this.clientListError = 'No clients yet.';
    //     });
  }

}
