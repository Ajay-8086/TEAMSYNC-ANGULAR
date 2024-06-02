import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/headerComponent/header.component";
import { FooterComponent } from "./components/footerComponent/footer.component";
import { TeamComponent } from "./components/teamSectionComponent/team.componnet";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AnimateOnScrollModule } from "primeng/animateonscroll";
const routes:Routes=[
    {path:'',component:HomeComponent}
]
@NgModule({
    declarations:[HomeComponent,HeaderComponent,FooterComponent,TeamComponent],
    imports:[CommonModule,RouterModule.forChild(routes),BrowserAnimationsModule,AnimateOnScrollModule],
    providers:[]
})
export class HomeModule{

}