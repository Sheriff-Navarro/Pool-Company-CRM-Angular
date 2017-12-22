import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoggedOut: boolean = false;

  signUpInfo = {
    username: '',
    password: ''
  };

  errorMessage: string;

  loginInfo = {
    username: '',
    password: ''
  };

  loginErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.checklogin()
      // If success, we are logged in.
      .then((resultFromApi) => {
          this.router.navigate(['/dashboard']);
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch((err) => {
          this.isLoggedOut = true;
      });
  }

  doSignUp() {
    this.authService.signup(this.signUpInfo)
      .then((resultFromApi) => {
          // clear form
          this.signUpInfo = {
            username: '',
            password: ''
          };

          // clear error message
          this.errorMessage = "";

          // redirect to /camels
          this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.errorMessage = parsedError.message + ' ';
      });
  } // close doSignUp()
  doLogin() {
    this.authService.login(this.loginInfo)
      .then((resultFromApi) => {
          // clear the form
          this.loginInfo = {
            username: '',
            password: ''
          };

          // clear the error message
          this.loginErrorMessage = "";

          // redirect to page if success
          this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
          const parsedError = err.json();
          this.loginErrorMessage = parsedError.message + ' ';
      });
  } // close doLogin()
}
// import { Component, OnInit } from '@angular/core';
// import { authService } from "../services/auth.service";
//
// @Component({
//   selector: 'app-auth',
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.css']
// })
//
// export class AuthComponent implements OnInit {
//   user: any;
//   formInfo = {
//     username: '',
//     password: ''
//   };
//   error: string;
//   privateData: any = '';
//
//   constructor(private session: authService) { }
//
//   ngOnInit() {
//     this.session.isLoggedIn()
//       .subscribe(
//         (user) => this.successCb(user)
//       );
//   }
//
//   login() {
//     this.session.login(this.formInfo)
//       .subscribe(
//         (user) => this.successCb(user),
//         (err) => this.errorCb(err)
//       );
//   }
//
//   signup() {
//     this.session.signup(this.formInfo)
//       .subscribe(
//         (user) => this.successCb(user),
//         (err) => this.errorCb(err)
//       );
//   }
//
//   logout() {
//     this.session.logout()
//       .subscribe(
//         () => this.successCb(null),
//         (err) => this.errorCb(err)
//       );
//   }
//
//   getPrivateData() {
//     this.session.getPrivateData()
//       .subscribe(
//         (data) => this.privateData = data,
//         (err) => this.error = err
//       );
//   }
//
//   errorCb(err) {
//     this.error = err;
//     this.user = null;
//   }
//
//   successCb(user) {
//     this.user = user;
//     this.error = null;
//   }
// }
