import { Component } from "@angular/core";

@Component({
    selector:'app-userHome',
    templateUrl:'./userHome.component.html',
    styleUrls:['./userHome.component.css']
})
export class UserHomeComponent{
    isSidebarClicked:boolean =false
    sidebarToggling(data:boolean){
        this.isSidebarClicked =data
        console.log(data);
        
    }
}