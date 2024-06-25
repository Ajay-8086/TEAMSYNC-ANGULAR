import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { userInterface } from "../../models/user.interface";
import { emailSerivice } from "../../services/userId.service";

@Component({
    selector:"app-register",
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})

export class RegisterComponent{
    constructor(private authService:AuthService,private fb:FormBuilder,private router:Router ){}
    passwordFieldType:string = 'password'
    // function to hide and show password
    passwordVisibility(){
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }

    // error message showing variable
    errMsg:string=''

    // usr registration form group
    userForm = this.fb.group({
        userName:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]],
        confirmPassword:['',Validators.required]
    })

    //user registering function
    onSubmit(){
        const formDatas = this.userForm.value as userInterface
        this.authService.creatUser(formDatas).subscribe(
            (response)=>{
                //navigating to the otp page            
                this.router.navigate(['/auth/verify_otp'])
            },
            (err)=>{
                this.errMsg = err.error
                setTimeout(() => {
                    this.errMsg=''
                }, 3000);
                
            }
        )
    }
}