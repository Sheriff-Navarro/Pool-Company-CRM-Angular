import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from "./services/auth.service";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logout',  component:  LogoutComponent},
  { path: '**', component: ErrorComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    DashboardComponent,
    ErrorComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),  //  <!-- "routes" is the array defined above
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
