import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }

  logoutError: string;

  ngOnInit() {
    this.AuthService.checklogin()

    .catch(() => {
      this.logoutError = 'Something went wrong. Please try to logout again.';
    });

  }

  logMeOutPls() {
    this.AuthService.logout()
    .then(() => {
      this.router.navigate(['/app/login']);
    })
    .catch(() => {
      this.logoutError = 'Something went wrong. Please try to logout again.';
    });
  } // close logMeOutPls()
}
