import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SupportManagerComponent } from './pages/support-manager/support-manager.component';
import { SupportTechnicialComponent } from './pages/support-technicial/support-technicial.component';
import { Error404Component } from './pages/error404/error404.component';
const routes: Routes = [
  {
    path: '', component: HomepageComponent, canActivate:[]
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
    path: '**', component:Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
