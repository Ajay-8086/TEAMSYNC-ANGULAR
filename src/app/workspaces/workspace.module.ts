import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';
import { SharedModule } from '../shared/shared.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    WorkspacesComponent,
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
  ],
  providers: []
})
export class WorkspaceModule {}
