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
connect(token: string): void {
    this.socket = io(environment.socketUrl, {
      auth: {
        token: token
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('connect_error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

    // function to disconnect the socket
    disconnect(){
        if(!this.socket){
            console.log('socket not connected');
            
        }
        this.socket?.disconnect()
    }
}