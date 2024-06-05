import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { userInterface } from "../models/user.interface";
import { Observable, map } from "rxjs";
import {emailSerivice } from "./userId.service";
import { loginInterface } from "../models/login.interface";
@Injectable({
    providedIn:'root'
})
export class AuthService{
    api = environment.url;
    constructor(private http:HttpClient,private emailSerivice:emailSerivice){}
    
    //user registration function
    creatUser(data:userInterface):Observable<userInterface>{
        // user registration api call
        const url = `${this.api}/auth/register`
        return this.http.post<userInterface>(url,data).pipe(
            // after user registered successfully response handling
            map((response)=>{
                // setting the user id 
                this.emailSerivice.seUserId(response.email)
                // returning the response
                return response
            })
        )
    }
    // otp verification function
    verifyOtp(otp:number,email:string){
        const url = `${this.api}/auth/verify_otp`
        return this.http.post(url,{otp,email})
    }
    // user login function
    login(loginData:loginInterface):Observable<string>{
        //login api
        const url = `${this.api}/auth/login`
        return this.http.post<any>(url,loginData).pipe(
            map((response)=>{
                const token = response.token
                // storing the token in the local storage 
                localStorage.setItem('token',token)
                return response
            })
        )
    }
}