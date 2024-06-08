import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector:'app-forms',
    templateUrl:'./form.component.html',
    styleUrls:['./form.component.css']
    
})
export class FormComponent{
    constructor(private dialogurRef:MatDialog){}
    dialoguClose(){
        this.dialogurRef.closeAll()

    }
}