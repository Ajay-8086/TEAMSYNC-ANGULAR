import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";

@Component({
    selector:'app-sidebar',
    templateUrl:'./sidebar.component.html',
    styleUrls:['./sidebar.component.css']
})
export class SidebarComponent{
    @Output() openingPopup= new EventEmitter<boolean>
    @Input() datas :any
    workspaces: any[] = [];
    openDialogue(){
        this.openingPopup.emit(true)
    }
    // checking any new changes in the input
    ngOnChanges(changes: SimpleChanges) {
        if (changes["datas"] && changes["datas"].currentValue) {
          this.workspaces = changes["datas"].currentValue;          
        }
      }
    }
