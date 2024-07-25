// socket.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import  {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io(environment.socketUrl); 
    console.log('Socket connected:', this.socket.connected);

    this.socket.on('connect', () => {
      const token = localStorage.getItem('token'); 
  if (token) {
    const decodedToken = jwtDecode(token) as { userId: string };
    // Register the user with the server using the decoded userId
    this.socket.emit('registerUser', decodedToken.userId);
  } else {
    console.error('No token found!');
  }
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  sendInvitation(userId: string, invitation: any) {
    this.socket.emit('sendInvitation', { userId, invitation });
  }

  onReceiveInvitation(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receiveInvitation', (invitation) => {
        observer.next(invitation);
      });

      return () => {
        this.socket.off('receiveInvitation');
      };
    });
  }
}