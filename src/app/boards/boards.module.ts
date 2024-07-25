import { NgModule } from "@angular/core";
import { BoardsComponent } from "./components/boards/boards.component";
import { CommonModule } from "@angular/common";
import { BoardFormComponent } from "./components/boardForm/boardForm.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TaskModule } from "../tasks/tasks.module";
import {  DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    declarations:[ BoardsComponent,BoardFormComponent ],
    imports:[ CommonModule,ReactiveFormsModule,SharedModule,MatIconModule,MatListModule,MatSidenavModule,TaskModule,DragDropModule,FormsModule],
    providers:[],
    exports:[BoardsComponent]
})
export class BoardsModule{

}