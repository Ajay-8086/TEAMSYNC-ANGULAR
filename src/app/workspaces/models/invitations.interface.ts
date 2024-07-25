export interface Invitation{
    _id:string,
    invitee?:any
    workspaceId?:any
    boardId?:any
    status:string
    message:string
    createdAt?: Date | string
    updatedAt?: Date
}