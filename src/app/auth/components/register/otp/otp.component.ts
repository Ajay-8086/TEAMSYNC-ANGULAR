import { Component } from "@angular/core";

@Component({
    selector:'app-otp',
    templateUrl:'./otp.component.html'
})
export class OtpComponent{
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
}