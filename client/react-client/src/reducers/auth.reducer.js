import {EDIT_USER, LOGIN_USER, RESET_USER} from '../types'

const defaultState = {
  userId: null,
  userName: '',
  isAuth: false,
  isResolved: false,
  imageUrl: '',
  token: ''
}

const initAuth = () => {
  const auth = (state = defaultState, action) => {
    switch(action.type) {
      case LOGIN_USER:
        return {
          ...state,
          isResolved: true,
          isAuth: !!action.token,
          userId: action.userId,
          userName: action.userName,
          token: action.token,
          imageUrl: action.imageUrl
        }
      case RESET_USER:
        return {...state, isAuth: false}
      case EDIT_USER:
        return {
          ...state, userName: action.userName,
          imageUrl: action.imageUrl
        }
      default:
        return state
    }
  }
  return auth
}


const auth = initAuth()

export default auth
