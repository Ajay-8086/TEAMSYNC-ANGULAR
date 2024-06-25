import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { workspaceFormService } from "../../../workspaces/services/workspaceForm.service";
import { workspaceFormData } from "../../model/workspaceForm.model";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { SendWorkspace } from "../../services/workspace.service";

@Component({
    selector:'app-forms',
    templateUrl:'./form.component.html',
    styleUrls:['./form.component.css']
    
})
export class FormComponent{
    constructor(private dialogurRef:MatDialogRef<FormComponent>,private fb:FormBuilder,private workspaceService:workspaceFormService,private sendWorkspace:SendWorkspace){}
    // pop up closing method 
    dialoguClose(){
        this.dialogurRef.close()

    }
    // workspace form building 
    workspaceForm = this.fb.group({
        name:['',Validators.required],
        type:['',Validators.required],
        description:['']
    })
    msg:string=''
    // checking the selected focus
    selectedFocus:boolean=false
    workspaceData!:workspaceFormData
    // adding member component variable
    memberComponent:boolean=false
    //workspaceId
    workspace!:Workspace
    // creating workspace form submission
    onSubmit(){
       this.workspaceData = this.workspaceForm.value as workspaceFormData
       // adding member component
       this.workspaceService.creatWorkSpace(this.workspaceData).subscribe(
           (response)=>{
               this.msg =  response.message
               this.workspace = response.newWorkspace
                this.sendWorkspace.setWorkspace(response.allWorkspaces)
               this.memberComponent = true
            },
            (err)=>{
                console.log(err);
                this.msg = err.error
                setTimeout(() => {
                    this.msg = ''
                },1000);
            }
        )
    }
    onSelectedFocus(){
        this.selectedFocus = true   
    }
    
}