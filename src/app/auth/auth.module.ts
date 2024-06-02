import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/Login/login.component";



const routes:Routes = [
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    
]

@NgModule({
    imports:[CommonModule,RouterModule.forChild(routes)],
    providers:[],
    declarations:[RegisterComponent,LoginComponent]
})
export class AuthModule{

}