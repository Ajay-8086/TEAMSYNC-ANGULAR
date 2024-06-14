import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'app-sidebar',
    templateUrl:'./sidebar.component.html',
    styleUrls:['./sidebar.component.css']
})
export class SidebarComponent{
    @Output() openingPopup= new EventEmitter<boolean>
    openDialogue(){
        this.openingPopup.emit(true)
    }
}