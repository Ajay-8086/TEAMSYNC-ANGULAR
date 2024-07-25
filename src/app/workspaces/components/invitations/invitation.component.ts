import { Component } from "@angular/core";
import { workspaceFormService } from "../../services/workspaceForm.service";
import { Invitation } from "../../models/invitations.interface";

@Component({
    selector:'app-invitations',
    templateUrl:'./invitation.component.html'
})
export class Invitations{
    invitations:Invitation[]=[]
    inviteeName:string=''
    constructor(private workspaceService:workspaceFormService){}
    ngOnInit(){
        this.workspaceService.getPendingInvitations().subscribe(
            (result)=>{
                this.invitations = result                
            },
            (err)=>{
                console.log(err);
            }
        )
    }
    // handling the invitations
    invitationHandle(invitationId:string,action:string){
        this.workspaceService.invitationHandle(invitationId,action).subscribe({
            next:()=>{
                console.log(this.invitations,'before');
                
                this.invitations = this.invitations.filter((invitation)=>invitation._id != invitationId)
                console.log(this.invitations,'after');

            },
            error: (error) => {
                console.error('Error deleting board:', error);
              }
    })
    }
}