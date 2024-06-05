import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { userInterface } from "../models/user.interface";
import { Observable, map } from "rxjs";
import { userIdService } from "./userId.service";
@Injectable({
    providedIn:'root'
})
export class AuthService{
    api = environment.url;
    constructor(private http:HttpClient,private userIdService:userIdService){}
    
    //user registration function
    creatUser(data:userInterface):Observable<userInterface>{
        // user registration api call
        const url = `${this.api}/auth/register`
        return this.http.post<userInterface>(url,data).pipe(
            // after user registered successfully response handling
            map((response)=>{
                // setting the user id 
                this.userIdService.seUserId(response.userId)
                // returning the response
                return response
            })
        )
    }
    // otp verification function
    verifyOtp(otp:number,userId:string){
        const url = `${this.api}/auth/verify_otp`
        return this.http.post(url,{otp,userId})
    }
    
}