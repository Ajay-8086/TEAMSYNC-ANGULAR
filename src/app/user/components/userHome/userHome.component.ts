import { Component } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from "src/app/shared/components/forms/form.component";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { workspaceFormService } from "src/app/workspaces/services/workspaceForm.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BoardService } from "src/app/boards/services/boards.service";
import { BoardFormComponent } from "src/app/boards/components/boardForm/boardForm.component";
@Component({
    selector:'app-userHome',
    templateUrl:'./userHome.component.html',
    styleUrls:['./userHome.component.css']
})
export class UserHomeComponent{
    constructor(
        private dialogueRef:MatDialog,
        private workspaceService:workspaceFormService,
        private breakpointObserver: BreakpointObserver,
        private boardService:BoardService,
    ){}
    // screen size matching variable
    isScreenSmall: boolean = false;
    // sidebar toggle variable
    isSidebarOpen: boolean = true;
    // board id
    boardIds!:string | null
    // passing data 
    data:any ;
    content!:string
    // getting the workspaceId 
    workspaceId!:string
    ngOnInit(): void {
      this.breakpointObserver.observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isScreenSmall = result.matches;
          if (this.isScreenSmall) {
            this.isSidebarOpen = false;  
          }
        });        
        // getting boardId 
        this.boardService.boardId$.subscribe(boardId=>{
          if(boardId){
            this.content = 'boards'
            this.boardService.getBoardsInWorkspace(boardId as string).subscribe(
              (result)=>{
                this.data = result.boardsInWorkspace
                this.workspaceId = result.workspace._id
              },
              (err)=>{
                console.log(err);
              }
            )
          }else{
            this.content = 'workspace'
            // getting all the workspaces
            this.workspaceService.worksapceDetails().subscribe(
              (result)=>{
                  this.data = result  as Workspace 
         
              },
              (error)=>{
                  console.log(error);
              }
          )
          }
        }) 
    }
  
    // sidebar toggling funtion
    toggleSidebar = () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
    // popup opening 
    dialoge(event:string){
        if(event == 'workspace'){
          this.dialogueRef.open(FormComponent)
        }
        else{
          console.log(this.workspaceId);
          
          this.dialogueRef.open(BoardFormComponent,{data:{workspaceId:this.workspaceId}})
        }
    }   
    datafor:boolean = false
    from:string = ''
    chatOn(eventData:boolean){
      this.datafor = eventData
    }
    closeNav(){;
      this.datafor = false
      
    }
  
}