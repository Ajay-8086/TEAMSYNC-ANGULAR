export interface Workspace{
    _id:string
    name:string,
    workspaceType:string,
    description?:string,
    members?:string[] 
    createdBy:string
}