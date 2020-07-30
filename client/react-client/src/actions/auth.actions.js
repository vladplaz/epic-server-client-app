import * as api from '../api'
import {EDIT_USER, LOGIN_USER, RESET_USER} from '../types'
import {deleteToken, getPayload, getToken, setToken} from '../helpers/token.helper'

export const login = (data) => dispatch =>
  api.login(data)
    .then(({token, userName, userId, imageUrl}) => {
      setToken(token)
      return dispatch({
        type: LOGIN_USER,
        token,
        userId,
        userName,
        imageUrl
      })
    }, e => Promise.reject(e))

export const loginFromStore = () => dispatch => {
  if(getToken()) {
    let {userId} = getPayload()
    api.loadUser(userId).then((data) => {
      dispatch({
        type: LOGIN_USER,
        token: getToken(),
        userName: data.userName,
        userId,
        imageUrl: data.imageUrl
      })
    })
  } else {
    dispatch({
      type: LOGIN_USER,
      token: ''
    })
  }
}

export const register = (data) => dispatch =>
  api.register(data)
    .then(({token, userName, userId, imageUrl}) => {
      setToken(token)
      dispatch({
        type: LOGIN_USER,
        userId,
        userName,
        token,
        imageUrl
      })
    }, e => Promise.reject(e))

export const logout = () => dispatch => {
  deleteToken()
  dispatch({
    type: RESET_USER
  })
}

export const editUser = (user) => dispatch =>
  api.editUser({
    file: user.image,
    userName: user.userName
  }).then(({imageUrl}) => {
    dispatch({
      type: EDIT_USER,
      userName: user.userName,
      imageUrl
    })
  })
