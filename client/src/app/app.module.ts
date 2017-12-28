import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Components
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { PostSignupComponent } from './post-signup/post-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
  { path: 'app/login',  component: AuthComponent },
  { path: 'app/dashboard', component: DashboardComponent },
  { path: 'app/settings',  component:  SettingsComponent },
  { path: 'app/post-signup',  component:  PostSignupComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    DashboardComponent,
    ErrorComponent,
    SettingsComponent,
    PostSignupComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),  //  <!-- "routes" is the array defined above
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
