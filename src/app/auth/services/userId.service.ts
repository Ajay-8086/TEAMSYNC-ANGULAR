import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class userIdService{
    private userIdSource = new BehaviorSubject<string>('');
    // observable streams the user id
    userId$ = this.userIdSource.asObservable() 
    seUserId(userId:string){
        this.userIdSource.next(userId)
    }
}