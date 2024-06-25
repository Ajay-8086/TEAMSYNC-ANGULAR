import { HttpClient } from "@angular/common/http"
import {  Injectable } from "@angular/core"
import { Observable } from "rxjs"

    
    @Injectable({
        providedIn:'root'
    })
    export class DeleteService{
        constructor(private http:HttpClient){}
        // deleting workspace 
        delete(url:string,workspaceId:string):Observable<string>{
            
            return this.http.delete<string>(url)
        }
    }