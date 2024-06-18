import { Component } from '@angular/core'
import { workspaceFormService } from '../../services/workspaceForm.service';

@Component({
    selector:'app-workspaces',
    templateUrl:'./workspaces.component.html'
})
export class WorkspacesComponent{
    constructor(private workspaceService:workspaceFormService){}
 // workspace variable
 workspaces!:any
 ngOnInit(){
     // getting all the workspaces
     this.workspaceService.worksapceDetails().subscribe(
         (result)=>{
             console.log(result);
             this.workspaces= result 
             console.log(this.workspaces,'hi');
             
         },
         (error)=>{
             console.log(error);
                
         }
     )
 }
}