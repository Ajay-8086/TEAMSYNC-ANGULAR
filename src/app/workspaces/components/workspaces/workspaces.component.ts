import { Component } from '@angular/core'
import { workspaceFormService } from '../../services/workspaceForm.service';
import { Workspace } from '../../models/workspace.interface';
import { SendWorkspace } from 'src/app/shared/services/workspace.service';

@Component({
    selector:'app-workspaces',
    templateUrl:'./workspaces.component.html'
})
export class WorkspacesComponent{
    constructor(private workspaceService:workspaceFormService,private sendWorkspace:SendWorkspace){}
 // workspace variable
 workspaces!:Workspace []
 ngOnInit(){
     // getting all the workspaces
     this.workspaceService.worksapceDetails().subscribe(
         (result)=>{
             this.workspaces= result as Workspace[]
         },
         (error)=>{
             console.log(error);    
         }
     )
     this.sendWorkspace.workspace$.subscribe((result)=>{
        this.workspaces = result
     })
 }
}