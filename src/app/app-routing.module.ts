import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SupportManagerComponent } from './pages/support-manager/support-manager.component';
import { SupportTechnicialComponent } from './pages/support-technicial/support-technicial.component';
import { Error404Component } from './pages/error404/error404.component';
import { NewComponent } from './pages/new/new.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { HelpComponent } from './pages/help/help.component';


const routes: Routes = [
  {
    path: 'homepage', component: HomepageComponent, canActivate:[]
  },

  {
    path: 'login', component:LoginComponent, canActivate:[]
  },

  {
    path: 'support-manager', component:SupportManagerComponent, canActivate: []
  },

  {
    path: 'support-technicial', component:SupportTechnicialComponent, canActivate: []
  },

  {
    path: '', redirectTo: 'support-manager'/*'homepage'*/, pathMatch: 'full'
  },

  {
    path: "new", component:NewComponent,canActivate:[]
  },

  {
    path: "tickets", component: TicketsComponent, canActivate: []
  },

  {
    path: "help", component: HelpComponent, canActivate: []
  },

  {
    path: '**', component:Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
