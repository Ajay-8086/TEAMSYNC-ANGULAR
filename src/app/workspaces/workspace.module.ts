import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';
import { SharedModule } from '../shared/shared.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Invitations } from './components/invitations/invitation.component';
import { NotificationComponent } from './components/notifications/notification.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    WorkspacesComponent,
    WorkspaceComponent,
    Invitations,
    NotificationComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [],
  exports:[Invitations,NotificationComponent]
})
export class WorkspaceModule {}
