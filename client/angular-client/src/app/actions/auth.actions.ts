import {createAction, props} from '@ngrx/store'

export enum authActionsType {
  LOGIN_USER = '[AUTH] LOGIN_USER',
  LOGIN_USER_FROM_STORE = '[AUTH] LOGIN_USER_FROM_STORE',
  LOGIN_USER_SUCCESS = '[AUTH] LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = '[AUTH] LOGIN_USER_FAILURE',
  RESET_USER = '[AUTH] RESET_USER',
  RESET_USER_SUCCESS = '[AUTH] RESET_USER_SUCCESS',
  EDIT_USER = '[AUTH] EDIT_USER',
  EDIT_USER_SUCCESS = '[AUTH] EDIT_USER_SUCCESS',
  EDIT_USER_FAILURE = '[AUTH] EDIT_USER_FAILURE',
  REGISTER_USER = '[AUTH] REGISTER_USER',
  REGISTER_USER_SUCCESS = '[AUTH] REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE = '[AUTH] REGISTER_USER_FAILURE'
}

export const login = createAction(
  authActionsType.LOGIN_USER,
  props<{
    email,
    password
  }>()
)

export const loginSuccess = createAction(
  authActionsType.LOGIN_USER_SUCCESS,
  props<{
    userId,
    userName,
    token,
    imageUrl
  }>()
)

export const loginFailure = createAction(
  authActionsType.LOGIN_USER_FAILURE,
  props<{
    message
  }>()
)

export const register = createAction(
  authActionsType.REGISTER_USER,
  props<{
    email,
    password,
    userName
  }>()
)

export const registerSuccess = createAction(
  authActionsType.REGISTER_USER_SUCCESS,
  props<{
    userId,
    userName,
    token,
    imageUrl
  }>()
)

export const registerFailure = createAction(
  authActionsType.REGISTER_USER_FAILURE,
  props<{
    message
  }>()
)

export const reset = createAction(
  authActionsType.RESET_USER
)

export const resetSuccess = createAction(
  authActionsType.RESET_USER_SUCCESS
)

export const edit = createAction(
  authActionsType.EDIT_USER,
  props<{
    image,
    userName
  }>()
)

export const editSuccess = createAction(
  authActionsType.EDIT_USER_SUCCESS,
  props<{
    imageUrl,
    userName
  }>()
)

export const editFailure = createAction(
  authActionsType.EDIT_USER_FAILURE,
  props<{
    message
  }>()
)

export const loginFromStore = createAction(
  authActionsType.LOGIN_USER_FROM_STORE
)

