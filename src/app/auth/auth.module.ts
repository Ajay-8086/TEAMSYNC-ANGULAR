import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/Login/login.component";
import { AuthComponent } from "./auth.component";
import { ForgotPasswordComponent } from "./components/forgotPassword/forgot-password.component";



const routes:Routes = [
    {path:'',component:AuthComponent,
    children:[
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'forgot_password',component:ForgotPasswordComponent},
    ]}
   
    
]

@NgModule({
    imports:[CommonModule,RouterModule.forChild(routes)],
    providers:[],
    declarations:[RegisterComponent,LoginComponent,AuthComponent,ForgotPasswordComponent]
})
export class AuthModule{

}