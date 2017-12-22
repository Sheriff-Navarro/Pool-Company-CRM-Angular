import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  logoutError: string;


  constructor(
     private router: Router,
     private auth: AuthService
   ) { }

  ngOnInit() {
    this.auth.logout()
      .then(() => {
          this.router.navigate(['/login']);
      })
      .catch(() => {
          this.logoutError = 'There was a problem loging you out. Please try again.';
      });
  }
}
