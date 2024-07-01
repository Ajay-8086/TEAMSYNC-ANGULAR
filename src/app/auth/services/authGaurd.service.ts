import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class AuthGaurd{
    constructor(private router:Router){}
    canActivate():boolean{
        // getting token from the localstorage 
        const token = localStorage.getItem('token')
        // checking the token is available 
        if(token){
            return true
        }else{
            this.router.navigate(['auth/login'])
            return false
        }
    }
}