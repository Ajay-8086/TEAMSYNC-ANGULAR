import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor{
    // intercept method
    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        // getting token from the localstorage
        const token = localStorage.getItem('token')
        // cloning the request 
        if(token){
            request = request.clone({
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            })
        }
        return next.handle(request)
    }
}