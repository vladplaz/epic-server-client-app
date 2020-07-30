export interface UserData {
  token: string,
  userId: number | string,
  userName: string,
  imageUrl: string
}

export interface UserLoginData {
  email: string,
  password: string
}

export interface UserRegisterData {
  email: string,
  password: string,
  userName: string
}

export interface UserEditData {
  userName: string,
  image: any
}

export interface UserEditDataSuccess {
  userName: string,
  imageUrl: any
}

export interface Todo {
  id: string | number,
  parent: any,
  todos?: Todo[],
  isOpen?: boolean,
  executed: boolean,
  stared: boolean,
  text: string
}

export interface TodoAddData {
  id?: string | number,
  parent: any,
  stared: boolean,
  text: string
}

export interface TodoDeleteData {
  parent: any,
  idsToDelete:any
}

export interface TodoStaredData {
  id: string|number,
  stared:boolean
}

export interface TodoExecutedData {
  id: string|number,
  executed:boolean
}

export interface TodoEditData {
  id: string|number,
  text:string
}
