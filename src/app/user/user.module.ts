import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/userHome/userHome.component";
import { ContainerComponent } from "./components/containerComponent/container.coponent";
import { MatDialogModule } from "@angular/material/dialog";
import { AuthGaurd } from "../auth/services/authGaurd.service";

const routes:Routes=[
    {path:'',component:UserHomeComponent,canActivate:[AuthGaurd],
        children:[
         {path:'home',component:ContainerComponent}
        ]
    }
]
@NgModule({
    declarations:[UserHomeComponent,ContainerComponent],
    imports:[CommonModule,SharedModule,RouterModule.forChild(routes),MatDialogModule],
    providers:[]
})
export class UserModule{

}