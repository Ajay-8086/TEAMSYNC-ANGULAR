import { Component, Inject, Input } from "@angular/core";
import { DeleteService } from "../../services/delete.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SendWorkspace } from "../../services/workspace.service";


@Component({
    selector:'app-delete',
    templateUrl:'./delete.component.html',
})
export class DeleteComponent{
constructor(
    @Inject(MAT_DIALOG_DATA) public data:{navigate:string,deletionData:string,workspaceId:string},
    private deleteService:DeleteService,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private router:Router,
    private sendWorkspace:SendWorkspace
){}
// function to delete
    delete(){
        this.deleteService.delete(this.data.navigate,this.data.workspaceId).subscribe(
            (result:any)=>{
                this.dialogRef.close({workspaceId:this.data.workspaceId})
                if(this.data.deletionData=='Workspace'){
                    const updatedWorkspace = result.newWorkspaces
                    this.sendWorkspace.setWorkspace(updatedWorkspace)
                    this.router.navigate(['/user/home'])
                }

            },
            (err)=>{
                console.log(err);
                
            }
        )
    }

    // function to close the method
    close(){
        this.dialogRef.close()
    }
}