import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnimationComponent } from './components/animation/animation.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { LoginComponent } from './pages/login/login.component';
import { SupportTechnicialComponent } from './pages/support-technicial/support-technicial.component';
import { SupportManagerComponent } from './pages/support-manager/support-manager.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { Error404Component } from './pages/error404/error404.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { NewComponent } from './pages/new/new.component';
import { HelpComponent } from './pages/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    TicketsComponent,
    NewComponent,
    HelpComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    FontAwesomeModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
