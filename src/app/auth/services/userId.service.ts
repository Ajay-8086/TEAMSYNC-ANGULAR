import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class emailSerivice{
    private userIdSource = new BehaviorSubject<string>('');
    // observable streams the user id
    email$ = this.userIdSource.asObservable() 
    seUserId(email:string){
        this.userIdSource.next(email)
    }
}