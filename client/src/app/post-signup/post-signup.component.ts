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
