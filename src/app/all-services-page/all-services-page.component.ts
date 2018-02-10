import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientsService } from '../services/clients.service';
import { ClientServiceService } from '../services/client-service.service';

@Component({
  selector: 'app-all-services-page',
  templateUrl: './all-services-page.component.html',
  styleUrls: ['./all-services-page.component.css']
})
export class AllServicesPageComponent implements OnInit {

  serviceArray: any[] = [];
  serviceListError: string;

  constructor(
    private AuthService: AuthService,
    private ClientServiceService: ClientServiceService,
    private router: Router
  ) { }


  ngOnInit() {
    this.AuthService.checklogin()
    .catch((err) => {
      this.router.navigate(['/app/login']);
    });
    this.ClientServiceService.getServices()
    .subscribe(
      (serviceList) => {
        this.serviceArray = serviceList;
      },
      () => {
        this.serviceListError = 'No Services Found.';
      }
    );
  }

  // toDelService(id) {
  //   console.log(this.clientArray)
  //   var clientToDel = this.clientArray;
  //   this.ClientsService.delClient(id)
  //   .subscribe(data => {
  //     if(data.n == 1){
  //       for(var i = 0; i < clientToDel.length; i++){
  //         if(clientToDel[i]._id == id){
  //           clientToDel.splice(i, 1);
  //         }
  //       }
  //     }
  //   });
  // }

}
