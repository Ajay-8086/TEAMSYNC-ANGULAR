import { Component, TemplateRef, ViewChild } from "@angular/core";
import { ProfileService } from "../../services/profile.service";
import { TokenDecodeService } from "../../services/tokenDecode.service";
import { userInterface } from "src/app/auth/models/user.interface";
import { Profile } from "../../models/profile.interface";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector:'app-profile',
    templateUrl:'./profile.component.html'
})
export class ProfileComponent{
    profileData!:any
    profileIcon!:string
    fields = [
        {
            placeholder : 'Your job title',
            icon:'fa-solid fa-suitcase',
            value:'',
            showIcons:false,
            key:'jobtitle',
            tooltip:'Your job title'
        },
        {
            placeholder : 'Your department',
            icon:'fas fa-sitemap',
            value:'',
            showIcons:false,
            key:'department',
            tooltip:'Your department'
        },
        {
            placeholder : 'Your organization ',
            icon:'fas fa-building',
            value:'',
            showIcons:false,
            key:'organization',
            tooltip:'Your organization '
        },
        {
            placeholder : 'Your Location',
            icon:'fas fa-map-marker-alt',
            value:'',
            showIcons:false,
            key:'location',
            tooltip:'Your Location'
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
    constructor(private profileService:ProfileService,private tokenService:TokenDecodeService, private dialogRef:MatDialog){}
    userData!:userInterface
    ngOnInit(){
      const  token = localStorage.getItem('token')
       this.userData = this.tokenService.getPayload(token as string)
       // getting the profile datas
       this.profileService.getProfile(this.userData.userId).subscribe(
        result=>{
            this.profileData = result 
            this.profileIcon = this.profileData.userId.userName.split('')[0]
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
     // dialog popup / notification of changing profile
     @ViewChild('dialogContent') dialogContent!:TemplateRef<any>
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
                    this.dialogRef.open(this.dialogContent,{
                        position: { bottom: '20px', left: '10px' },
                        hasBackdrop:false
                    })
                    setTimeout(() => {
                        this.dialogRef.closeAll()
                    }, 1000);
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