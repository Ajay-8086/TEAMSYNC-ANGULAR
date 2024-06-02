import { Component } from "@angular/core";

@Component({
    selector:'app-home-team',
    templateUrl:'./team.component.html',
    styleUrls:['./team.component.css']
})
export class TeamComponent{
    cards:cards[]=[
        {
        image: '../../../../assets/images/card1.png',
        heading: "Grow Your Business",
        description: "All the tools you need to scale the team work"
    }, 
    {
        image: '../../../../assets/images/card2.png',
        heading: "Work Better Together",
        description: "Explore company project in one place"
    },
    {
        image: '../../../../assets/images/card3.png',
        heading: "Enjoy The Process",
        description: "Reconnect with the joy of creating fun among members"
    }
    ]
 
}

interface cards {
    image:string,
    heading:string,
    description:string
}