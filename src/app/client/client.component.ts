import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClientsService } from '../services/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  CurrentClientId: string;

  errorMessage: string;

  client:any = {};

  // newData = {
  //   clientFirstName: '',
  //   clientLastName: '',
  //   clientUsername: '',
  //   clientPrimaryPhone: '',
  //   clientStreet1: '',
  //   clientStreet2: '',
  //   clientCity: '',
  //   clientProvince: '',
  //   clientZip: ''
  // }

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private ClientsService: ClientsService,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.CurrentClientId = ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.AuthService.checklogin()
    .catch(() => {
      this.router.navigate(['/app/login']);
    });
    this.ClientsService.getThisClient(this.CurrentClientId)
    .subscribe((clientFromApi) => {
      if (!clientFromApi){
        this.router.navigate(['/app/dashboard']);
      }
      console.log(clientFromApi)
      this.client = clientFromApi;
    })
  }


  doEditClient() {
    this.ClientsService.editClient(this.CurrentClientId, this.client).toPromise()
    .then((resultFromApi) => {
      this.client = resultFromApi;
      // clear error message
      this.errorMessage = "";

      // this.router.navigate(['/app/client/edit']);
    })
    .catch((err) => {
      const parsedError = err.json();
      this.errorMessage = parsedError.message + '';
    });
  }
}
