import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/userHome/userHome.component";

const routes:Routes=[
    {path:'home',component:UserHomeComponent,
        children:[
         
        ]
    }
]
@NgModule({
    declarations:[UserHomeComponent],
    imports:[CommonModule,SharedModule,RouterModule.forChild(routes)],
    providers:[]
})
export class UserModule{

}