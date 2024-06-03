import { Component } from "@angular/core";

@Component({
    selector:"app-register",
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})

export class RegisterComponent{
    passwordFieldType:string = 'password'
    passwordVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
}