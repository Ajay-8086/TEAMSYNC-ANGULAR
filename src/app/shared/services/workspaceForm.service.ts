import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { workspaceForm } from "../model/workspaceForm.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class workspaceFormService{
    api = environment.url
    constructor(private htttp:HttpClient){}
    // workspace creating function
    creatWorkSpace(formData:workspaceForm):Observable<any>{
        const url = `${this.api}/workspace_create`
        return this.htttp.post<workspaceForm>(url,formData)
    }
}