import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn:"root"
})
export class TokenDecodeService{
    getPayload(token:string):any{
        try {
            return jwtDecode(token)
        } catch (error) {
                return null
        }
    }
}