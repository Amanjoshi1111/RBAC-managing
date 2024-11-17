export interface Permission {
    feature : String,
    actions : Action[]
}

export enum Action {
    get = "get",
    create = "create",
    update = "update",
    delete = "delete"
}