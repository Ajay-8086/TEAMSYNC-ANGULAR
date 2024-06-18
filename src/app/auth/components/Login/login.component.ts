import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { loginInterface } from "../../models/login.interface";
import { Router } from "@angular/router";
import { SocketService } from "src/app/shared/services/socket.service";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})
export class LoginComponent{
    passwordFieldType:string = 'password'
    passwordVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
    constructor(private authService:AuthService,private fb:FormBuilder,private router:Router,private socketService:SocketService){}
       loginForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
    })
    errMsg:string = ''
    // user login function
    login(){
        const loginData = this.loginForm.value as loginInterface
        this.authService.login(loginData).subscribe(
            (response:any)=>{
               const  token = response.token
                     this.socketService.connect(token)
                    this.router.navigate(['/user/home'])
            },
            (error)=>{
                console.log(error);
                this.errMsg = error.error.message
                setTimeout(() => {
                    this.errMsg=''
                }, 3000);
                if(error.status === 403){
                    this.router.navigate(['/auth/verify_otp'])
                }
            }
        )
    }
}