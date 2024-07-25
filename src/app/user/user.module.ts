import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UserHomeComponent } from "./components/userHome/userHome.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AuthGaurd } from "../auth/services/authGaurd.service";
import { WorkspacesComponent } from "../workspaces/components/workspaces/workspaces.component";
import { WorkspaceComponent } from "../workspaces/components/workspace/workspace.component";
import { FormsModule } from "@angular/forms";
import { UserProfileComponent } from "./components/userProfilePopup/userProfile.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { BoardsComponent } from "../boards/components/boards/boards.component";
import { WorkspaceModule } from "../workspaces/workspace.module";


const routes:Routes=[
    {path:'',component:UserHomeComponent,canActivate:[AuthGaurd],
        children:[
         {path:'home',component:WorkspacesComponent},
         {path:'workspaces/:workspaceId',component:WorkspaceComponent},
         {path:'board/:boardId',component:BoardsComponent}
        ]
    }
]
@NgModule({
    declarations:[UserHomeComponent,UserProfileComponent,ProfileComponent],
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        MatDialogModule,
        FormsModule,
        MatTooltipModule,
        MatListModule,
        MatSidenavModule,
    ],
    providers:[],
})
export class UserModule{

}