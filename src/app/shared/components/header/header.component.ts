import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
    // sidebar toggling
    isSidebarOpen:boolean=false
    // sidebar toggle event passing
    @Output() menuClicked = new EventEmitter<boolean>()
    toggleSidebar(){
        this.isSidebarOpen=!this.isSidebarOpen
        this.menuClicked.emit(this.isSidebarOpen)
    }
}