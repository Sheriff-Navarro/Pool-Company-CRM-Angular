import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SessionService } from "./services/session.service";
import { Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { authComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    authComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule 
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
