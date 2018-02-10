import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  errorMessage = "";

  currentUser = {
    avatarUrl: '',
    firstName: '',
    lastName: '',
    username: '',
    // password: '',
    companyName: '',
    primaryPhone: '',
    street1: '',
    street2: '',
    city: '',
    province: '',
    zip: '',
    isClient: ''
  };

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private UsersService: UsersService
  ) { }

  ngOnInit() {
    this.AuthService.checklogin()
      .then((userFromApi) => {
        console.log("USER FROM API ", userFromApi);
        this.currentUser =  userFromApi
      })
      .catch(() => {
          this.router.navigate(['/app/login']);
      });
    }

    deleteUser(){
      this.UsersService.deleteUser()
        .then((resultFromApi) => {
            // clear error message
            this.errorMessage = "";

            // redirect to /camels
            this.router.navigate(['/app/login']);
        })
        .catch((err) => {
            const parsedError = err.json();
            this.errorMessage = parsedError.message + ' ';
        });
    }
}
