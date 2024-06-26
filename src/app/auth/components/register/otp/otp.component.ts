import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { emailSerivice } from "src/app/auth/services/userId.service";

@Component({
    selector:'app-otp',
    templateUrl:'./otp.component.html',
    styleUrls:['./otp.component.css']
})
export class OtpComponent{
    @ViewChild("otp1Ref") otp1Ref!: ElementRef
    @ViewChild("otp2Ref") otp2Ref!: ElementRef
    @ViewChild("otp3Ref") otp3Ref!: ElementRef
    @ViewChild("otp4Ref") otp4Ref!: ElementRef
    // atuo focus change 
    autoInputChange(currenInput:HTMLInputElement,nextInput:HTMLInputElement|null):void{
        // auto focus change to next input
        if(currenInput.value.length === currenInput.maxLength){
            nextInput?.focus()
            if(nextInput?.value){
                nextInput.select()
            }
        // auto focus change to previous input     
        }else if (currenInput.value.length === 0) {
            (currenInput.previousElementSibling as HTMLInputElement)?.focus(); 
            if((currenInput.previousElementSibling as HTMLInputElement).value){
                (currenInput.previousElementSibling as HTMLInputElement)?.select()
            }
          }      
    }
    //selecting input on the backspacing
    onKeyup(event:KeyboardEvent,index:number){
        const target = event.target as HTMLInputElement
        if(event.key==='Backspace' && index > 1 && !target.value ){
            const preInput = (this as any)['otp' + (index - 1) + 'Ref'].nativeElement
            if(preInput.value){
                preInput.select()
            }
            preInput.focus()
        }
    }
    // setting focus on the input
    selectInput(event:any,index:number){
        console.log(1);
        
        const preInput = (this as any )['otp'+(index) + 'Ref'].nativeElement
        console.log(preInput);
        
        preInput.select()
    }
    email:string=''
    constructor(private emailSerivice:emailSerivice,private fb:FormBuilder,private authService:AuthService,private router:Router){}
    ngOnInit(){ 
        this.startCountDown()
       this.emailSerivice.email$.subscribe((email)=>{
        this.email = email
        
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
    otpCountdown:number = 10 * 60 * 1000
    // otp timer 
    startCountDown(){
        const countdown = () => {
            if (this.otpCountdown > 0) {
              this.otpCountdown -= 1000; // Decrease countdown by 1 second (1000 milliseconds)
              setTimeout(countdown, 1000); // Call countdown again after 1 second
            }
        }
        countdown();
    }
    // timer formating 
    formatTimer(time:number){
        const minutes = Math.floor(time/(60 * 1000))
        const seconds = Math.floor((time % (60 * 1000)) / 1000)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
    // otp verifying 
    verifyOtp(){
        //concatinating otp
        const otp = parseInt(`${this.otpForm.value.otp1}${this.otpForm.value.otp2}${this.otpForm.value.otp3}${this.otpForm.value.otp4}`);
        this.authService.verifyOtp(otp,this.email).subscribe(
            (response)=>{
                this.errMsg = response as string
                // navigating to the user login
                this.router.navigate(['/auth/login'])
            },
            (error)=>{
                 console.log(error);
                    this.errMsg = error.error
            }
        )
    }   

}