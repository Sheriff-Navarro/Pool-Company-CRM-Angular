import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientsService} from '../services/clients.service';

@Component({
  selector: 'app-all-clients-page',
  templateUrl: './all-clients-page.component.html',
  styleUrls: ['./all-clients-page.component.css']
})
export class AllClientsPageComponent implements OnInit {
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
          this.router.navigate(['/app/login']);
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
    console.log(this.clientArray)
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
