import { NgModule } from "@angular/core";
import { BoardsComponent } from "./components/boards/boards.comoponent";
import { CommonModule } from "@angular/common";
import { BoardFormComponent } from "./components/boardForm/boardForm.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[ BoardsComponent,BoardFormComponent ],
    imports:[ CommonModule,ReactiveFormsModule ],
    providers:[],
    exports:[BoardsComponent]
})
export class BoardsModule{

}