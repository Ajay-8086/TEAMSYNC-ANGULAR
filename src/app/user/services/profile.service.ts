import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Profile } from "../models/profile.interface";

@Injectable({
    providedIn:"root"
})
export class ProfileService{
    constructor(private http:HttpClient){}
    api = environment.url
    // creatin or updating the userprofile 
    createProfile(userData:any){
        const url = `${this.api}/profile_create`
        return this.http.post<string>(url,userData)
    }
    // getting the profile details
    getProfile(userId:string){
        const url = `${this.api}/profile/${userId}`
        return this.http.get(url)
    }
}