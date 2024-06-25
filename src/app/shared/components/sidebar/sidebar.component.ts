import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { SendWorkspace } from "../../services/workspace.service";

@Component({
    selector:'app-sidebar',
    templateUrl:'./sidebar.component.html',
    styleUrls:['./sidebar.component.css']
})
export class SidebarComponent{
  constructor(private sendWorkspace:SendWorkspace){}
    @Output() openingPopup= new EventEmitter<boolean>
    @Input() datas :any
    workspaces: Workspace[] = [];
    openDialogue(){
        this.openingPopup.emit(true)
    }
    // checking any new changes in the input
    ngOnChanges(changes: SimpleChanges) {
        if (changes["datas"] && changes["datas"].currentValue) {
          this.workspaces = changes["datas"].currentValue;          
        }
      }
      // changes in workspace detected
      ngOnInit():void{
        this.sendWorkspace.workspace$.subscribe(workspaces=>{
          this.workspaces = workspaces
        })
      }
    }
