import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any = {};
  clientsNum: number;

  constructor(
    private AuthService: AuthService,
    private ClientsService: ClientsService,
    private router: Router
) { }

  ngOnInit() {
    this.AuthService.checklogin()
      .catch(() => {
          this.router.navigate(['/app/login']);
      });

      this.ClientsService.getClients()
        .subscribe(
          (clientList) => {
              this.clientsNum = clientList.length;
          });
  }
}
