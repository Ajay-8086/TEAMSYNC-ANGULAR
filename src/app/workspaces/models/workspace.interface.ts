export interface Workspace{
    _id:string
    workspaceName:string,
    workspaceType:string,
    description?:string,
    members?:string[]
    createdBy:string
}