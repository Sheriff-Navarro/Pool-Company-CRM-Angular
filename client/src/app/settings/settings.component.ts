import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: any = {};

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.AuthService.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
      })
      .catch(() => {
          this.router.navigate(['/app/login']);
      });
  }

}
