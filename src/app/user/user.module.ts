import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/userHome/userHome.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AuthGaurd } from "../auth/services/authGaurd.service";
import { WorkspacesComponent } from "../workspaces/components/workspaces/workspaces.component";
import { WorkspaceComponent } from "../workspaces/components/workspace/workspace.component";
import { BoardFormComponent } from "../boards/components/boardForm/boardForm.component";


const routes:Routes=[
    {path:'',component:UserHomeComponent,canActivate:[AuthGaurd],
        children:[
         {path:'home',component:WorkspacesComponent},
         {path:'workspaces/:workspaceId',component:WorkspaceComponent}
        ]
    }
]
@NgModule({
    declarations:[UserHomeComponent],
    imports:[CommonModule,SharedModule,RouterModule.forChild(routes),MatDialogModule],
    providers:[]
})
export class UserModule{

}