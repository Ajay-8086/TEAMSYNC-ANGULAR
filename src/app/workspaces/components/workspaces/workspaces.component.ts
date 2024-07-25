// workspaces.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { workspaceFormService } from '../../services/workspaceForm.service';
import { Workspace } from '../../models/workspace.interface';
import { SendWorkspace } from 'src/app/shared/services/workspace.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Invitation } from '../../models/invitations.interface';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html'
})
export class WorkspacesComponent implements OnInit, OnDestroy {
  workspaces!: Workspace[];
  private invitationSubscription!: Subscription;
  invitations!:Invitation
  constructor(
    private workspaceService: workspaceFormService,
    private sendWorkspace: SendWorkspace,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    // getting realtime invitations 
    this.invitationSubscription = this.socketService.onReceiveInvitation().subscribe((invitation) => {
      console.log('Received invitation in component:', invitation);
      alert(`Received invitation: ${invitation.message}`);
    });
    // getting pending invitations 
    this.workspaceService.getPendingInvitations().subscribe(
      (result)=>{
        this.invitations = result
      },
      (err)=>{
        console.log(err);
        
      }
    )
    // Fetching workspaces
    this.workspaceService.worksapceDetails().subscribe(
      (result) => {
        this.workspaces = result as Workspace[];
      },
      (error) => {
        console.log(error);
      }
    );
    this.sendWorkspace.workspace$.subscribe((result) => {
      this.workspaces = result;
    });
  }

  ngOnDestroy() {
    if (this.invitationSubscription) {
      this.invitationSubscription.unsubscribe();
    }
  }
}
