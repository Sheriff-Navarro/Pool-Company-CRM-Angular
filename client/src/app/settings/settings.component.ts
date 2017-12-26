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

  currentUser = {
    avatarUrl: '',
  };

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private UsersService: UsersService
  ) { }

  ngOnInit() {
    this.AuthService.checklogin()
      .then((userFromApi) => {
          this.UsersService.getUser()
          .subscribe(userFromApi => {
        this.currentUser =  userFromApi  })
      })
      .catch(() => {
          this.router.navigate(['/app/login']);
      });
    }
}
