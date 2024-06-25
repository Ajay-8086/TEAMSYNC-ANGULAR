import { Component, Input } from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/app/shared/model/member';
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
    private dialogRef:MatDialogRef<AddingMemberComponent>,
    private sendWrorkspace:SendWorkspace
  ){}
  searchTerm: string = '';
  // getting workspace id
  @Input() workspace !:Workspace
  // members array variable
  searchResults: Member[] | any = [];
 //selected user
  selectedUser:Member[]=[]
  // searching the available users
  searching(){
    if(this.searchTerm.length >= 3){
      console.log(this.searchTerm);
      
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
    this.workspaceService.inviteMembers(this.selectedUser,this.workspace._id).subscribe(
      (result)=>{
        console.log(result);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  // closing dialog and redirecting to home
  closeDialogue(){
    this.router.navigateByUrl('/user/home')

    this.dialogRef.close()
  }
}
