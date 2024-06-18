import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { workspaceFormData } from "../../shared/model/workspaceForm.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Member } from "../../shared/model/member";

@Injectable({
    providedIn:'root'
})
export class workspaceFormService{
    api = environment.url
    constructor(private http:HttpClient){}
    // workspace getting
    worksapceDetails(){
        const url = `${this.api}/workspace`
        return this.http.get(url)
    }

    // workspace creating function
    creatWorkSpace(formData:workspaceFormData):Observable<any>{
        const url = `${this.api}/workspace_create`
        return this.http.post<workspaceFormData>(url,formData)
    }
    // searching members function
    searchingMembers(query:string):Observable<Member>{
        const url = `${this.api}/member_search`
        
        return this.http.post<Member>(url,{query})
    }
    // Inviting members function
    inviteMembers(membersList:Member[],workspaceId:string):Observable<any>{
        const url = `${this.api}/invite`
        return this.http.post(url,{membersList,workspaceId})
    }
}