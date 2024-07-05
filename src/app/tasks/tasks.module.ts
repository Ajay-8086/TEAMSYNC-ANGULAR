import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TaskComponent } from "./taskComponent/task.component";

import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
    declarations:[TaskComponent,],
    imports:[CommonModule,ReactiveFormsModule,DragDropModule],
    exports:[TaskComponent]
})
export class TaskModule{

}