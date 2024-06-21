import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { workspaceFormService } from "src/app/workspaces/services/workspaceForm.service";
import { BoardService } from "../../services/boards.service";
import { BoardForm } from "../../models/board.interface";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector:'app-boardForm',
    templateUrl:'./boardForm.component.html'
})
export class BoardFormComponent{
    // background images 
    backgrounds: string[] = [
        '../../../../assets/background/dark-abstract-texture.jpg',
        '../../../../assets/background/majestic.jpg',
        '../../../../assets/background/painting.jpg',
        '../../../../assets/background/red-light.jpg',
        '../../../../assets/background/galactic.jpg'
    ];
    backgroundColors:string[] = ['#FFFFFF', '#C0F5FA', '#AF125A', '#F8FAC0', '#FF8640']
    // setting the background of the boards
    selectedBackgroundImage:string|null = null
    selectedWorkspaceId:string = ''
    selectedBackgroundColor:string | null = this.backgroundColors[0]
    changeBackground(bg:string):void{
        this.selectedBackgroundImage = bg
        this.selectedBackgroundColor = null
        this.boardForm.patchValue({ background: bg });
    }

    //setting the backgroundcolor of the boards
    changeBackgroundColor(color:string):void{
        this.selectedBackgroundColor = color
        this.selectedBackgroundImage = null
        this.boardForm.patchValue({background:color})
    }


    constructor(private workspaceService:workspaceFormService,private dialogurRef:MatDialog, private fb:FormBuilder, private boardService:BoardService){}
    workspaces!:Workspace[]
    // creating board form
    boardForm = this.fb.group({
        boardName:['',Validators.required],
        workspace:[this.selectedWorkspaceId],
        visbility:['private'],
        background:[this.selectedBackgroundColor]
    })
    ngOnInit(){
        this.workspaceService.worksapceDetails().subscribe(
            (result)=>{
                this.workspaces = result as Workspace[];
                console.log(result);
                 // Set the default workspace option in the form 
                 if (this.workspaces.length > 0) {
                    console.log(this.workspaces[0]._id);
                    
                 this.boardForm.patchValue({ workspace: this.workspaces[0]._id });
          }
            },
            (error)=>{  
                console.log(error);
                
            }
        )
    }
    // creating board function
    onSubmit(){
        const boardData = this.boardForm.value
        console.log(boardData);
        
        this.boardService.createBoard(boardData as BoardForm).subscribe(
            (response)=>{
                console.log(response);
            },
            (err)=>{
                console.log(err);
                
            }
        )
    }
     // pop up closing method 
     dialoguClose(){
        this.dialogurRef.closeAll()

    }
}