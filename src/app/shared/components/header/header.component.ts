import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserProfileComponent } from "../../../user/components/userProfilePopup/userProfile.component";
import { TokenDecodeService } from "src/app/user/services/tokenDecode.service";
import { NotificationComponent } from "src/app/workspaces/components/notifications/notification.component";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
    // checking screen size 
    @Input() isScreenSmall: boolean = false;
    @Input() toggleSidebar!: () => void
    // input from profile
    @Input() profile !:boolean
    constructor(private dialogRef:MatDialog,private tokenService:TokenDecodeService){}
    // profile popup showing function
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
        // getting token 
        const token = localStorage.getItem('token')
        if(token){
            const userData = this.tokenService.getPayload(token)
            // setting user icon 
            this.icon = userData.userName.split('')[0].toUpperCase()
        }
    }
    // opening the caht sidebar
    @Output() chatOn = new EventEmitter<boolean>()
    chat(){
        this.chatOn.emit(true)
    }
    // notification popup
    notifications(){
        this.dialogRef.open(NotificationComponent,{
            position: { top: '4rem', right: '3rem' },
            backdropClass:'transparent-backdrop'
        })
    }

    
}