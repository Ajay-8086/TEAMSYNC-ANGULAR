import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:"root"
})
export class BoardService{
    api = environment.url

    constructor(private http:HttpClient){}
    //create board
    createBoard(formData:){

    }
}