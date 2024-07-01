import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from "src/app/shared/components/forms/form.component";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { workspaceFormService } from "src/app/workspaces/services/workspaceForm.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
    selector:'app-userHome',
    templateUrl:'./userHome.component.html',
    styleUrls:['./userHome.component.css']
})
export class UserHomeComponent{
    constructor(
        private dialogueRef:MatDialog,
        private workspaceService:workspaceFormService,
        private breakpointObserver: BreakpointObserver
    ){}
    // screen size matching variable
    isScreenSmall: boolean = false;
    // sidebar toggle variable
    isSidebarOpen: boolean = true;
    // workspace variable
    workspaces!:Workspace 
    ngOnInit(): void {
      this.breakpointObserver.observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isScreenSmall = result.matches;
          if (this.isScreenSmall) {
            this.isSidebarOpen = false;  
          }
        });
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
  
    // sidebar toggling funtion
    toggleSidebar = () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
    // popup opening 
    dialoge(event:boolean){
        if(event)
        this.dialogueRef.open(FormComponent)
    }   
}