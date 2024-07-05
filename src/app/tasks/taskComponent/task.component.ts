import { Component, Input } from "@angular/core";

@Component({
    selector:'app-task-card',
    templateUrl:'./task.component.html'
})
export class TaskComponent{
    @Input() card:any
}