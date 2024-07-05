import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { Workspace } from "src/app/workspaces/models/workspace.interface";
import { SendWorkspace } from "../../services/workspace.service";
import { BoardForm } from "src/app/boards/models/board.interface";

@Component({
    selector:'app-sidebar',
    templateUrl:'./sidebar.component.html',
    styleUrls:['./sidebar.component.css']
})
export class SidebarComponent{
  constructor(private sendWorkspace:SendWorkspace){}
    @Output() openingPopup= new EventEmitter<string>
    @Input() datas :any
    workspaces: Workspace[] = [];
    boards : BoardForm[] = []
    @Input()content!: string 
    openDialogue(content:string){
        this.openingPopup.emit(content)
    }
    // checking any new changes in the input
    ngOnChanges(changes: SimpleChanges) {
        if (changes["datas"] && changes["datas"].currentValue) {
          if (this.content === 'workspace') {
            this.workspaces = changes['datas'].currentValue;
          } else if (this.content === 'boards') {
            this.boards = changes['datas'].currentValue;
          }
        
      }
    }
      // changes in workspace detected
      ngOnInit():void{
        this.sendWorkspace.workspace$.subscribe(workspaces=>{
          this.workspaces = workspaces
        })

      }
      @Input() isSidebarOpen: boolean = true;
      @Input() isScreenSmall: boolean = false;
      @Input() toggleSidebar!: () => void;
    }
