import { Component } from "@angular/core";
import { TokenDecodeService } from "../../services/tokenDecode.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector:'app-profile-popup',
    templateUrl:'./userProfile.component.html'
})
export class UserProfileComponent{
    constructor(private tokenDecodeService:TokenDecodeService , private router:Router, private dialog:MatDialog){}
    userData:any
    icon:string=''
    userId!:string
    ngOnInit():void{
        // getting token from local storeage
        const token = localStorage.getItem('token')
        if(token){
            // getting the details of the loged user
            this.userData = this.tokenDecodeService.getPayload(token)
            // getting the first letter of the username
            this.icon = this.userData.userName.split('')[0].toUpperCase()
            // user Id getting
            this.userId = this.userData.userId
        }
    }
    //managing the user account
    manageAccount(){
        this.dialog.closeAll()
        this.router.navigateByUrl(`/profile/${this.userId}`)
    }
    // loging out the user 
    logout(){
        localStorage.removeItem('token')
        this.dialog.closeAll()
        this.router.navigateByUrl('')
    }
}