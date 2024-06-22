import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from "src/app/shared/components/forms/form.component";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { workspaceFormService } from "src/app/workspaces/services/workspaceForm.service";
@Component({
    selector:'app-userHome',
    templateUrl:'./userHome.component.html',
    styleUrls:['./userHome.component.css']
})
export class UserHomeComponent{
    constructor(private dialogueRef:MatDialog,private workspaceService:workspaceFormService){}
    isSidebarClicked: boolean | undefined; 
    sidebarToggling(data:boolean){
        this.isSidebarClicked =data
    }
    // popup opening 
    dialogue(event:boolean){
        if(event)
        this.dialogueRef.open(FormComponent)
    }   
    // workspace variable
    workspaces!:Workspace
    
    ngOnInit(){
        // getting all the workspaces
        this.workspaceService.worksapceDetails().subscribe(
            (result)=>{
                this.workspaces= result  as Workspace                
            },
            (error)=>{
                console.log(error);
                   
            }
        )
    }
}