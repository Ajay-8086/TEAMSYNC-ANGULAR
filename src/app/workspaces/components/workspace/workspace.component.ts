import { Component, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { workspaceFormService } from "../../services/workspaceForm.service";
import { Workspace } from "../../models/workspace.interface";
import { MatDialog } from "@angular/material/dialog";
import { BoardFormComponent } from "src/app/boards/components/boardForm/boardForm.component";
import { BoardForm } from "src/app/boards/models/board.interface";
import { BoardService } from "src/app/boards/services/boards.service";
import { environment } from "src/environments/environment";
import { DeleteComponent } from "src/app/shared/components/deleteComponent/delete.componet";
import { AddingMemberComponent } from "src/app/shared/components/forms/addingMember/addingMember.component";
import { User } from "src/app/user/models/user.interface";


@Component({
    selector:'app-workspace',
    templateUrl:'./workspace.component.html'
})
export class WorkspaceComponent{
    constructor(
        private route:ActivatedRoute,
        private workspaceService:workspaceFormService ,
        private dialogueRef:MatDialog,
        private boardService:BoardService,
        private router :Router,
    ){}
    workspaceId!:string | null
    workspace:Workspace | null =null
    members:User[] =[]
    boards:BoardForm[] =[]
    memberColors: string[] = [];
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
                this.generateMemberColor()                
                this.boards = data.boards
            },
            (error)=>[
                console.log(error)
                
            ]
        )
    }
    //opening the popup for adding the boards
    openDialogue(){
        this.dialogueRef.open(BoardFormComponent,{data:{workspaceId:this.workspaceId}})
    }

    // changing the background style of the boards
    getBgstyle(background:any):{[key:string]:string}{
        if(this.isColor(background)){
            return {'background-color':background , 'color':'grey'}
        }else{
            return {'background-image':`url(${background})`,'background-size':'cover','background-position':'cover','color':'white'}
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
        return this.boards.filter(board => board.name.toLowerCase().includes( this.searchTerm.toLowerCase() ))
    }
   
    // Changing  the board to stared or not
    changeStar(boardId:string){
        const board = this.boards.find(b => b._id == boardId)
        if(board){
            board.stared = !board.stared
            this.boardService.stared(boardId,board.stared).subscribe(
                (response)=>{
                    console.log(response);
                },
                (err)=>{
                    console.log(err);
                    
                }
            )
        }
    }

    // deleting workspace
    navigateUrl:string = ''
    deleteWorkspace(workspaceId:string | undefined){
        const api  = environment.url
        // route of deletion 
        this.navigateUrl = `${api}/user/workspace_delete/${workspaceId}`
        // passing data to the modal 
        this.dialogueRef.open(DeleteComponent,{data:{navigate:this.navigateUrl,deletionData:'Workspace',workspaceId:workspaceId}})
    }

    // getting the board details 
    
    boardDetail(boardId:string){
        // this.boardService.setBoardId(boardId)
        this.router.navigateByUrl(`/user/board/${boardId}`)
    }

    // inviting member
    inviteMembers(workspceId:string | undefined){
        this.dialogueRef.open(AddingMemberComponent,{
            data:{workspaceId:workspceId}
        })
    }

    // generating random colors for the avatar bg
     generateMemberColor(){
        this.memberColors = this.members.map(()=>this.generateRandomColor());
     }

     generateRandomColor():string{
        let letters = '0123456789ABCDE'
        let color = '#'
        for(let i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random()*16)]
        }
        return color
     }
}