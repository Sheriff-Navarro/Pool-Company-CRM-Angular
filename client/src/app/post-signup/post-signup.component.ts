import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {AuthService} from '../services/auth.service'
import {UsersService} from '../services/users.service'

@Component({
  selector: 'app-post-signup',
  templateUrl: './post-signup.component.html',
  styleUrls: ['./post-signup.component.css']
})
export class PostSignupComponent implements OnInit {
  isLoggedOut: boolean = false;

  errorMessage: string;

  FormData = {
    // username: '',
    // password: '',
    // avatarUrl: '',
    firstName: '',
    lastName: '',
    companyName: '',
    primaryPhone: '',
    street1: '',
    street2: '',
    city: '',
    province: '',
    zip: '',
  };

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private UsersService: UsersService
  ) { }

  ngOnInit()  {
    this.AuthService.checklogin()
      .then((userFromApi) => {
          this.UsersService.getUser()
          .subscribe(userFromApi => {
        this.FormData =  userFromApi  })
      })
      .catch(() => {
          this.router.navigate(['/app/login']);
      });
    }

  updateUserAccount() {
    this.UsersService.updateUser(this.FormData)
      .then((resultFromApi) => {
          // clear form
          this.FormData = {
            // username: '',
            // password: '',
            // avatarUrl: '',
            firstName: '',
            lastName: '',
            companyName: '',
            primaryPhone: '',
            street1: '',
            street2: '',
            city: '',
            province: '',
            zip: ''
          };

          // clear error message
          this.errorMessage = "";

          // redirect to /camels
          this.router.navigate(['/app/dashboard']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.errorMessage = parsedError.message + ' ';
      });
  } // close doSignUp()

}
