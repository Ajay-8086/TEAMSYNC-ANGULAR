import { Component } from "@angular/core";
import { ProfileService } from "../../services/profile.service";
import { TokenDecodeService } from "../../services/tokenDecode.service";
import { userInterface } from "src/app/auth/models/user.interface";
import { Profile } from "../../models/profile.interface";

@Component({
    selector:'app-profile',
    templateUrl:'./profile.component.html'
})
export class ProfileComponent{
    profileData!:any
    fields = [
        {
            placeholder : 'Your job title',
            icon:'fa-solid fa-suitcase',
            value:'',
            showIcons:false,
            key:'jobtitle'
        },
        {
            placeholder : 'Your department',
            icon:'fas fa-sitemap',
            value:'',
            showIcons:false,
            key:'department'
        },
        {
            placeholder : 'Your organization ',
            icon:'fas fa-building',
            value:'',
            showIcons:false,
            key:'organization'
        },
        {
            placeholder : 'Your Location',
            icon:'fas fa-map-marker-alt',
            value:'',
            showIcons:false,
            key:'location'
        },
    ]
    // showing the icons on the focus
    focus(field:any){
        field.showIcons = true
    }
    //hiding the icon on the blur
    blur(field:any){
        setTimeout(()=>{
            field.showIcons = false
        },200)
    }
    constructor(private profileService:ProfileService,private tokenService:TokenDecodeService){}
    userData!:userInterface
    ngOnInit(){
      const  token = localStorage.getItem('token')
       this.userData = this.tokenService.getPayload(token as string)
       // getting the profile datas
       this.profileService.getProfile(this.userData.userId).subscribe(
        result=>{
            this.profileData = result 
            this.fields.forEach((field)=>{
                if(this.profileData[field.key]){
                    field.placeholder = this.profileData[field.key]
                }
            })
        },
        err=>{
            console.log(err);
            
        }
       )
       
    }
    // submiting the input field data 
    onSubmit(field:any){
        const data:Payload = {}
        this.fields.forEach((f)=>{
            if(f.value){
                data[f.key] = f.value
            }
        })
        if (this.userData && this.userData.userId) {
            data['userId'] = this.userData.userId;
          }
        // check if there is any field is empty 
        if(Object.keys(data).length > 1){
            this.profileService.createProfile(data).subscribe(
                response=>{
                    console.log(response);
                },
                error=>{
                    console.log(error);
                }
            )
        }
        // hide the icon
        field.showIcons = false
        
    }
    cancel(field:any){
        field.showIcons = false
    }
}
interface Payload {
    [key: string]: string;
  }