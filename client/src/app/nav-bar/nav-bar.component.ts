import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser = {
    avatarUrl: '',
    firstName: '',
}

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private UsersService: UsersService
  ) { }

  logoutError: string;

  ngOnInit() {
    this.AuthService.checklogin()
    .then((userFromApi) => {
        this.UsersService.getUser()
        .subscribe(userFromApi => {
      this.currentUser =  userFromApi  })
    })
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
