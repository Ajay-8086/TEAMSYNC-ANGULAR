import { NgModule } from "@angular/core";
import { BoardsComponent } from "./components/boards/boards.comoponent";
import { CommonModule } from "@angular/common";
import { BoardFormComponent } from "./components/boardForm/boardForm.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    declarations:[ BoardsComponent,BoardFormComponent ],
    imports:[ CommonModule,ReactiveFormsModule,SharedModule,MatIconModule,MatListModule,MatSidenavModule],
    providers:[],
    exports:[BoardsComponent]
})
export class BoardsModule{

}