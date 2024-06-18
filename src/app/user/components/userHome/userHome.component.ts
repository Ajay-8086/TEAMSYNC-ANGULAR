import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from "src/app/shared/components/forms/form.component";
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
        console.log(data);
        
    }
    // popup opening 
    dialogue(event:boolean){
        if(event)
        this.dialogueRef.open(FormComponent)
    }   
    // workspace variable
    workspaces!:any
    ngOnInit(){
        // getting all the workspaces
        this.workspaceService.worksapceDetails().subscribe(
            (result)=>{
                console.log(result);
                this.workspaces= result 
                console.log(this.workspaces,'hhhe');
                
            },
            (error)=>{
                console.log(error);
                   
            }
        )
    }
}