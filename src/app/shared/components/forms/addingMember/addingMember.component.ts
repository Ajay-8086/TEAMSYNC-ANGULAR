import { Component, Input } from '@angular/core';
import { Member } from 'src/app/shared/model/member';
import { workspaceFormData } from 'src/app/shared/model/workspaceForm.model';
import { workspaceFormService } from 'src/app/workspaces/services/workspaceForm.service';


@Component({
  selector: 'app-addingMember',
  templateUrl: './addingMember.component.html',
})
export class AddingMemberComponent{
  constructor(private workspaceService:workspaceFormService){}
  searchTerm: string = '';
  // getting workspace id
  @Input() id :string =''
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
          console.log(this.searchResults);
          
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
    this.workspaceService.inviteMembers(this.selectedUser,this.id).subscribe(
      (result)=>{
        console.log(result);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
