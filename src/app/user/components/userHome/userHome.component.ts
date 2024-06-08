import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from "src/app/shared/components/forms/form.component";
@Component({
    selector:'app-userHome',
    templateUrl:'./userHome.component.html',
    styleUrls:['./userHome.component.css']
})
export class UserHomeComponent{
    constructor(private dialogueRef:MatDialog){}
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
}