import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { workspaceFormService } from "../../services/workspaceForm.service";
import { workspaceForm } from "../../model/workspaceForm.model";

@Component({
    selector:'app-forms',
    templateUrl:'./form.component.html',
    styleUrls:['./form.component.css']
    
})
export class FormComponent{
    constructor(private dialogurRef:MatDialog,private fb:FormBuilder,private workspaceService:workspaceFormService){}
    // pop up closing method 
    dialoguClose(){
        this.dialogurRef.closeAll()

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
    // creating workspace form submission
    onSubmit(){
        const workspaceData = this.workspaceForm.value as workspaceForm
        this.workspaceService.creatWorkSpace(workspaceData).subscribe(
            (response)=>{
                console.log(response);
                this.msg =  response.message
                setTimeout(() => {
                    this.dialoguClose()
                    this.msg = ''
                },1000);
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