import { Component } from "@angular/core";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})
export class LoginComponent{
    passwordFieldType:string = 'password'
    passwordVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
}