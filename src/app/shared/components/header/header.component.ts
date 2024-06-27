import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserProfileComponent } from "../../../user/components/userProfilePopup/userProfile.component";
import { TokenDecodeService } from "src/app/user/services/tokenDecode.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
    //no sidebar
    @Input() nosidebar:boolean =true

    // sidebar toggling
    isSidebarOpen:boolean=false
    // sidebar toggle event passing
    @Output() menuClicked = new EventEmitter<boolean>()
    toggleSidebar(){
        this.isSidebarOpen=!this.isSidebarOpen
        this.menuClicked.emit(this.isSidebarOpen)
    }
    constructor(private dialogRef:MatDialog,private tokenService:TokenDecodeService){}
    showProfile(){
        this.dialogRef.open(UserProfileComponent,{
            position: { top: '4rem', right: '1rem' },
            width: '18rem',
            backdropClass:'transparent-backdrop'
        })
    }
    //user icon
    icon:string=''
    ngOnInit(){
        const token = localStorage.getItem('token')
        if(token){
            const userData = this.tokenService.getPayload(token)
            this.icon = userData.userName.split('')[0].toUpperCase()
        }
    }

}