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

  toDelClient(id) {
    var clientToDel = this.clientArray;

    this.ClientsService.delClient(id)
    .subscribe(data => {
      if(data.n == 1){
        for(var i = 0; i < clientToDel.length; i++){
          if(clientToDel[i]._id == id){
            clientToDel.splice(i, 1);
          }
        }
      }
    });
  }

}
