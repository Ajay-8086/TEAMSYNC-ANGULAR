import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class TaskService{
    api = environment.url

    constructor(private http:HttpClient){}
       // creating the task
       creatingTask(columnId:string|undefined,taskName:string):Observable<any>{
        const url = `${this.api}/user/task/create`
        return this.http.post(url,{columnId,taskName})
    }
      // Update task position
  updateTaskPosition(taskId: string, columnId: string, position: number ,newPos:number,moving:string,container:string): Observable<any> {
    const url = `${this.api}/task/position`
    return this.http.put(url, { columnId, position,taskId ,newPos,moving,container});
  }

}