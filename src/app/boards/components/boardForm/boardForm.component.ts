import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { workspaceFormService } from "src/app/workspaces/services/workspaceForm.service";

@Component({
    selector:'app-boardForm',
    templateUrl:'./boardForm.component.html'
})
export class BoardFormComponent{
    // setting the background of the boards
    selectedBackground:string='../../../../assets/background/dark-abstract-texture.jpg'
    // background images 
    backgrounds: string[] = [
        '../../../../assets/background/dark-abstract-texture.jpg',
        '../../../../assets/background/majestic.jpg',
        '../../../../assets/background/painting.jpg',
        '../../../../assets/background/red-light.jpg',
        '../../../../assets/background/galactic.jpg'
      ];
    changeBackground(bg:string):void{
        this.selectedBackground = bg
        this.boardForm.get('background')?.setValue(bg)
    }

    constructor(private workspaceService:workspaceFormService, private fb:FormBuilder){}
    workspaces!:Workspace[]
    ngOnInit(){
        this.workspaceService.worksapceDetails().subscribe(
            (result)=>{
                this.workspaces = result as Workspace[];
                console.log(result);
                
            },
            (error)=>{  
                console.log(error);
                
            }
        )
    }
    // creating board form
    boardForm = this.fb.group({
        boardName:['',Validators.required],
        workspace:[''],
        visbility:[''],
        background:['']
    })
    // creating board function
    onSubmit(){
        const boardData = this.boardForm.value
    }


}