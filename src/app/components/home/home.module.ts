import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./homeComponent/home.component";
import { CommonModule } from "@angular/common";
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { HeaderComponent } from "./homeComponent/headerComponent/header.component";
import { FooterComponent } from "./homeComponent/footerComponent/footer.component";
import { TeamComponent } from "./homeComponent/teamSectionComponent/team.componnet";
const routes:Routes=[
    {path:'',component:HomeComponent}
]
@NgModule({
    declarations:[HomeComponent,HeaderComponent,FooterComponent,TeamComponent],
    imports:[CommonModule,RouterModule.forChild(routes),AnimateOnScrollModule],
    providers:[]
})
export class HomeModule{

}