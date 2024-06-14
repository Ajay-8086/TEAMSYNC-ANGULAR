import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import {MatIconModule} from '@angular/material/icon';
import { FormComponent } from "./components/forms/form.component";
import { AddingMemberComponent } from "./components/forms/addingMember/addingMember.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[HeaderComponent,SidebarComponent,FormComponent,AddingMemberComponent],
    imports:[CommonModule,MatIconModule,ReactiveFormsModule,FormsModule,RouterModule],
    providers:[],
    exports:[HeaderComponent,SidebarComponent]

})
export class SharedModule{

}