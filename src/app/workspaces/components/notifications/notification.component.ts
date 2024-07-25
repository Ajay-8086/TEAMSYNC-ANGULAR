import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector:'app-notification',
    templateUrl:'./notification.component.html',
    styleUrls:['./notification.component.css']
})
export class NotificationComponent{
    constructor(private dialog:MatDialog){}
    activeTab: string = 'All';
    // closing the dialog box
    close(){
        this.dialog.closeAll()
    }
    // showing the invitations
    invitation:boolean = false
    gotoInvitation(): void {
        this.invitation = true;
        this.setActiveTab('Invitations');
      }
    
      setActiveTab(tab: string): void {
        this.activeTab = tab;
      }
}