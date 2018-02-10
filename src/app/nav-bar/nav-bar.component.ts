import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // @Input() username: string;
  // @Input() profilePicUrl: string;
  currentUser = {
    avatarUrl: '',
    username: ''
}

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private UsersService: UsersService
  ) { }

  logoutError: string;
  loadingNavError: string;

  ngOnInit() {
    this.AuthService.checklogin()
    .then((userFromApi) => {
      this.currentUser =  userFromApi  })
    .catch(() => {
      this.loadingNavError = 'Something went wrong loading the Nav-Bar';
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
