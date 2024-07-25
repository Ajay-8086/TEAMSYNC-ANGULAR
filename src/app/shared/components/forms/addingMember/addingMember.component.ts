import { Component, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/app/shared/model/member';
import { SocketService } from 'src/app/shared/services/socket.service';
import { SendWorkspace } from 'src/app/shared/services/workspace.service';
import { Workspace } from 'src/app/workspaces/models/workspace.interface';
import { workspaceFormService } from 'src/app/workspaces/services/workspaceForm.service';


@Component({
  selector: 'app-addingMember',
  templateUrl: './addingMember.component.html',
})
export class AddingMemberComponent{
  constructor(
    private workspaceService:workspaceFormService ,
    private router:Router,
  @Inject(MAT_DIALOG_DATA) public data:{workspaceId:string},
    // private sendWrorkspace:SendWorkspace
    private socketService:SocketService,
    public dialogRef: MatDialogRef<AddingMemberComponent>,
  ){}
  searchTerm: string = '';
  // getting workspace id
  // @Input() workspace !:Workspace
  // members array variable
  searchResults: Member[] | any = [];
 //selected user
  selectedUser:Member[]=[]
  errorMsg:string = ''
  // searching the available users
  searching(){
    if(this.searchTerm.length >= 3){
      this.workspaceService.searchingMembers(this.searchTerm).subscribe(
        (result)=>{
          this.searchResults = result
        },
      (err)=>{
        console.log(err);
        
      }
    )
    }
  }
  // selected user the user 
  selectUser(user:Member):void{    
    if(!this.selectedUser.some(selected=>selected._id===user._id)){
      this.selectedUser.push(user)
    }
    this.searchTerm = ''
    this.searchResults=[]
  }
  // removing the selected users 
  removeUser(user:Member):void{
    this.selectedUser = this.selectedUser.filter(u=>u!=user)
  }
  // inviting members to the wokspace
  onSubmit(){
    this.workspaceService.inviteMembers(this.selectedUser,this.data.workspaceId).subscribe(
      (result)=>{
        console.log(result);
        this.selectedUser.forEach(user => {
          const invitation = {
            userId: user._id,
            workspaceId: this.data.workspaceId,
            message: 'You have been invited to join the workspace.'
          };
          this.socketService.sendInvitation(user._id, invitation);
          this.closeDialogue()
        });
      },
      (err)=>{
        console.log(err.error);
        this.errorMsg = err.error
        setTimeout(() => {
          this.errorMsg = ''
        }, 2000);
      }
    )
  }
  // closing dialog and redirecting to home
  closeDialogue(){
    this.dialogRef.close()
  }
}
