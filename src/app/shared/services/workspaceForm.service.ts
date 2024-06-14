import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { workspaceFormData } from "../model/workspaceForm.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Member } from "../model/member";

@Injectable({
    providedIn:'root'
})
export class workspaceFormService{
    api = environment.url
    constructor(private http:HttpClient){}
    // workspace creating function
    creatWorkSpace(formData:workspaceFormData):Observable<any>{
        const url = `${this.api}/workspace`
        return this.http.post<workspaceFormData>(url,formData)
    }
    // searching members function
    searchingMembers(query:string):Observable<Member>{
        const url = `${this.api}/member_search`
        
        return this.http.post<Member>(url,{query})
    }
}