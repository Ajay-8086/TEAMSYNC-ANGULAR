import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { workspaceFormService } from "../../services/workspaceForm.service";
import { Workspace } from "../../models/workspace.interface";
import { MatDialog } from "@angular/material/dialog";
import { BoardFormComponent } from "src/app/boards/components/boardForm/boardForm.component";
import { BoardForm } from "src/app/boards/models/board.interface";


@Component({
    selector:'app-workspace',
    templateUrl:'./workspace.component.html'
})
export class WorkspaceComponent{
    constructor(private route:ActivatedRoute,private workspaceService:workspaceFormService , private dialogueRef:MatDialog){}
    workspaceId!:string | null
    workspace:Workspace | null =null
    members!:string[]
    boards:BoardForm[] =[]
    //workspace id getting function
    ngOnInit():void{
        this.route.paramMap.subscribe(params=>{
            this.workspaceId = params.get('workspaceId')
            if(this.workspaceId){
                this.fetchWorkspaceDetails(this.workspaceId)
            }
        })
    }

    // getting the workspace details
    fetchWorkspaceDetails(id:string){
         this.workspaceService.getWorkspaceById(id).subscribe(
            (data)=>{
                this.workspace = data.workspaceDetails
                this.members = data.workspaceDetails.members
                this.boards = data.boards
            },
            (error)=>[
                console.log(error)
                
            ]
        )
    }
    //opening the popup for adding the boards
    openDialogue(){
        this.dialogueRef.open(BoardFormComponent)
    }

    // changing the background style of the boards
    getBgstyle(background:any):{[key:string]:string}{
        if(this.isColor(background)){
            return {'background-color':background}
        }else{
            return {'background-image':`url(${background})`,'background-size':'cover','background-position':'cover'}
        }
    }
    // checking is it color or not
    isColor(color:string):boolean{
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    // searching boards 
    searchTerm:string = ''
    filterdBoards(){
        if(!this.searchTerm){
            return this.boards
        }
        return this.boards.filter(board => board.boardName.toLowerCase().includes( this.searchTerm.toLowerCase() ))
    }
}