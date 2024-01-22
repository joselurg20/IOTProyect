import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SupportManagerComponent } from './pages/support-manager/support-manager.component';
import { Error404Component } from './pages/error404/error404.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { NewComponent } from './pages/new/new.component';
import { HelpComponent } from './pages/help/help.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    TicketsComponent,
    NewComponent,
    HelpComponent,
    SupportManagerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent, 
    ReactiveFormsModule,
    FontAwesomeModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
