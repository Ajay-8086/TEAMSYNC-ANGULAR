import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home.component';

const routes: Routes = [
  // default route
  {path:'',component:HomeComponent},
  // lazy loaded  module register and login
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
