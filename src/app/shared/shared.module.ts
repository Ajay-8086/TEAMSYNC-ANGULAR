import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations:[HeaderComponent,SidebarComponent],
    imports:[CommonModule,MatIconModule],
    providers:[],
    exports:[HeaderComponent,SidebarComponent]

})
export class SharedModule{

}