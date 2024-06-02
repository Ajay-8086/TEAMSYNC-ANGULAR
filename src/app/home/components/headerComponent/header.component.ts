import { Component, Input } from "@angular/core";

@Component({
    selector:'app-home-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']

})

export class HeaderComponent{
    @Input() isScrolled:boolean=false
}