import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { userIdService } from "src/app/auth/services/userId.service";

@Component({
    selector:'app-otp',
    templateUrl:'./otp.component.html'
})
export class OtpComponent{
    userId:string=''
    // atuo focus change 
    autoInputChange(currenInput:HTMLInputElement,nextInput:HTMLInputElement|null):void{
        // auto focus change to next input
        if(currenInput.value.length === currenInput.maxLength){
            nextInput?.focus()
        // auto focus change to previous input     
        }else if (currenInput.value.length === 0) {
            (currenInput.previousElementSibling as HTMLInputElement)?.focus(); 
          }      
    }

    constructor(private userIdService:userIdService,private fb:FormBuilder,private authService:AuthService,private router:Router){}
    ngOnInit(){
       this.userIdService.userId$.subscribe((userId)=>{
        this.userId = userId
        console.log(this.userId);
        
       })
    }
    // error message variable
    errMsg:string =''
    otpForm=this.fb.group({
        otp1:['',Validators.required],
        otp2:['',Validators.required],
        otp3:['',Validators.required],
        otp4:['',Validators.required],
    })
    // otp verifying 
    verifyOtp(){
        //concatinating otp
        const otp = parseInt(`${this.otpForm.value.otp1}${this.otpForm.value.otp2}${this.otpForm.value.otp3}${this.otpForm.value.otp4}`);
        this.authService.verifyOtp(otp,this.userId).subscribe(
            (response)=>{
                // navigating to the user home 
                this.router.navigate(['/user/home'])
            },
            (error)=>{
                 console.log(error);
                    this.errMsg = error.error
            }
        )
    }   

}