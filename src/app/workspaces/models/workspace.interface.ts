import { User } from "src/app/user/models/user.interface"

export interface Workspace{
    _id:string
    name:string,
    workspaceType:string,
    description?:string,
    members?:User[] 
    createdBy:string
}