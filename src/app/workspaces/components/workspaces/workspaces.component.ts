import { Component } from '@angular/core'
import { workspaceFormService } from '../../services/workspaceForm.service';
import { Workspace } from '../../models/workspace.interface';

@Component({
    selector:'app-workspaces',
    templateUrl:'./workspaces.component.html'
})
export class WorkspacesComponent{
    constructor(private workspaceService:workspaceFormService){}
 // workspace variable
 workspaces!:Workspace []
 ngOnInit(){
     // getting all the workspaces
     this.workspaceService.worksapceDetails().subscribe(
         (result)=>{
             console.log(result);
             this.workspaces= result as Workspace[]
             console.log(this.workspaces,'hi');
             
         },
         (error)=>{
             console.log(error);
                
         }
     )
 }
}