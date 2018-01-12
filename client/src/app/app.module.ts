import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { ClientsService } from "./services/clients.service";
import { ClientServiceService } from './services/client-service.service';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Components
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { PostSignupComponent } from './post-signup/post-signup.component';
import { NewClientComponent } from './new-client/new-client.component';
import { AllClientsPageComponent } from './all-clients-page/all-clients-page.component';
import { ClientComponent } from './client/client.component';
import { AllServicesPageComponent } from './all-services-page/all-services-page.component'
import { NewServiceComponent } from './new-service/new-service.component';

const routes: Routes = [
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
  { path: 'app/login',  component: AuthComponent },
  { path: 'app/dashboard', component: DashboardComponent },
  { path: 'app/settings',  component:  SettingsComponent },
  { path: 'app/post-signup',  component:  PostSignupComponent },
  { path: 'app/client/new',  component:  NewClientComponent },
  { path: 'app/client',  component: AllClientsPageComponent },
  { path: 'app/client/details/:id',  component:  ClientComponent },
  { path: 'app/service',  component:  AllServicesPageComponent },
  { path: 'app/service/new',  component:  NewServiceComponent },
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
    NewClientComponent,
    AllClientsPageComponent,
    ClientComponent,
    AllServicesPageComponent,
    NewServiceComponent
  ],
  imports: [
    RouterModule.forRoot(routes),  //  <!-- "routes" is the array defined above
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, UsersService, ClientsService, ClientServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
