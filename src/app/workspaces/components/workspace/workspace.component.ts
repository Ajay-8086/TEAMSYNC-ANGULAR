import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { workspaceFormService } from "../../services/workspaceForm.service";
import { Workspace } from "../../models/workspace.interface";
import { MatDialog } from "@angular/material/dialog";
import { BoardFormComponent } from "src/app/boards/components/boardForm/boardForm.component";

@Component({
    selector:'app-workspace',
    templateUrl:'./workspace.component.html'
})
export class WorkspaceComponent{
    constructor(private route:ActivatedRoute,private workspaceService:workspaceFormService , private dialogueRef:MatDialog){}
    workspaceId!:string | null
    workspaceDetails:Workspace | null =null
    members!:string[]
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
                this.workspaceDetails = data
                console.log(data,'workspacedetails');
                this.members = data.members
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
}