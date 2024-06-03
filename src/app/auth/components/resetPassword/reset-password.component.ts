import { Component } from "@angular/core";

@Component({
    selector:'app-reset',
    templateUrl:'./reset-password.component.html',
    styleUrls:['./reset-password.component.css']
})
export class ResetPasswordComponent{
    passwordFieldType:string = 'password'
    passwordVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
}