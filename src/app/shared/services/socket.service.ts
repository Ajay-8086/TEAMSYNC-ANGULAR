import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Socket, io } from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class SocketService{
    socket:Socket | undefined
//function connecting to the socket.io

}