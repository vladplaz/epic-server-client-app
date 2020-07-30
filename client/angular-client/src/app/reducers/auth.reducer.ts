import {
  editSuccess, loginSuccess,
  registerSuccess, resetSuccess
} from '../actions/auth.actions'
import {Action, createReducer, on} from '@ngrx/store'

const initState = {
  userId: '',
  userName: '',
  isAuth: false,
  isResolved: false,
  imageUrl: '',
  token: ''
}

export interface AuthState {
  userId?: string | number,
  userName?: string,
  isAuth?: boolean,
  isResolved?: boolean,
  imageUrl?: string,
  token?: string
}

const authReducer = createReducer(
  initState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      isResolved: true,
      isAuth: !!action.token,
      userId: action.userId,
      userName: action.userName,
      token: action.token,
      imageUrl: action.imageUrl
    }
  }),
  on(registerSuccess, (state, action) => {
    return {
      ...state,
      isResolved: true,
      isAuth: !!action.token,
      userId: action.userId,
      userName: action.userName,
      token: action.token,
      imageUrl: action.imageUrl
    }
  }),
  on(resetSuccess, state => {
    return {...state, isAuth: false, isResolved: true}
  }),
  on(editSuccess, (state, action) => {
    return {
      ...state, userName: action.userName,
      imageUrl: action.imageUrl
    }
  })
)

export function reducer(state,
                        action: Action) {
  return authReducer(state, action)
}
