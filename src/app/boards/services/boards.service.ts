import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BoardForm } from "../models/board.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class BoardService{
    api = environment.url

    constructor(private http:HttpClient){}
    //create board
    createBoard(formData:BoardForm):Observable<any>{
        const url = `${this.api}/boards_create`
        return this.http.post<BoardForm>(url,formData)
    }
    // making the boards in stared
    stared(boardId:string,isStared:boolean):Observable<string>{
        const url =  `${this.api}/boards/ad_to_star`
        return this.http.patch<string>(url,{boardId,isStared})
    }
}