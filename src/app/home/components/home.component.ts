import { Component, HostListener } from "@angular/core";

@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent{
    isScrolled:boolean=false
    @HostListener('window:scroll')
    onScroll(){
        // check the user scrolled
        this.isScrolled = window.scrollY > 0
    }
    ngOnInit(){
        // checking the initial scroll 
        this.isScrolled = window.scrollY > 0

    }
}
