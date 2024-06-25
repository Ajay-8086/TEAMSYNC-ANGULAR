import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Workspace } from "src/app/workspaces/models/workspace.interface";

@Injectable({
    providedIn:'root'
})
export class SendWorkspace{
    private workspaceDetails = new BehaviorSubject<any>(null)
    workspace$ = this.workspaceDetails.asObservable()
    
    setWorkspace(workspace:any){
        console.log(workspace,'fdsa');
        this.workspaceDetails.next(workspace)
    }
}