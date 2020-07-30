import {Action, createAction, props} from '@ngrx/store'
import {Todo} from '../shared/interfaces'

export enum todosActionsType {
  FETCH_TODOS = '[TODOS] FETCH_TODOS',
  FETCH_TODOS_SUCCESS = '[TODOS] FETCH_TODOS_SUCCESS',
  DELETE_TODOS = '[TODOS] DELETE_TODOS',
  DELETE_TODOS_SUCCESS = '[TODOS] DELETE_TODOS_SUCCESS',
  EDIT_TODO = '[TODOS] EDIT_TODO',
  EDIT_TODO_SUCCESS = '[TODOS] EDIT_TODO_SUCCESS',
  MARK_STARED_TODO = '[TODOS] MARK_STARED_TODO',
  MARK_STARED_TODO_SUCCESS = '[TODOS] MARK_STARED_TODO_SUCCESS',
  MARK_EXECUTED_TODO = '[TODOS] MARK_EXECUTED_TODO',
  MARK_EXECUTED_TODO_SUCCESS = '[TODOS] MARK_EXECUTED_TODO_SUCCESS',
  ADD_TODO = '[TODOS] ADD_TODO',
  ADD_TODO_SUCCESS = '[TODOS] ADD_TODO_SUCCESS',
  CHANGE_TODO_OPEN = '[TODOS] CHANGE_TODO_OPEN',
  ON_SEARCH_TODOS = '[TODOS] ON_SEARCH_TODOS',
}

export const fetch = createAction(
  todosActionsType.FETCH_TODOS
)

export const fetchSuccess = createAction(
  todosActionsType.FETCH_TODOS_SUCCESS,
  props<{
    todos:Todo[]
  }>()
)

export const add = createAction(
  todosActionsType.ADD_TODO,
  props<{
    text,
    stared,
    parent
  }>()
)

export const addSuccess = createAction(
  todosActionsType.ADD_TODO_SUCCESS,
  props<{
    id,
    text,
    stared,
    parent
  }>()
)

export const deleteTodos = createAction(
  todosActionsType.DELETE_TODOS,
  props<{
    parent,
    idsToDelete
  }>()
)

export const deleteTodosSuccess = createAction(
  todosActionsType.DELETE_TODOS_SUCCESS,
  props<{
    parent
  }>()
)

export const markStared = createAction(
  todosActionsType.MARK_STARED_TODO,
  props<{
    id,
    stared
  }>()
)

export const markStaredSuccess = createAction(
  todosActionsType.MARK_STARED_TODO_SUCCESS,
  props<{
    id,
    stared
  }>()
)

export const edit = createAction(
  todosActionsType.EDIT_TODO,
  props<{
    id,
    text
  }>()
)

export const editSuccess = createAction(
  todosActionsType.EDIT_TODO_SUCCESS,
  props<{
    id,
    text
  }>()
)

export const markExecuted = createAction(
  todosActionsType.MARK_EXECUTED_TODO,
  props<{
    id,
    executed
  }>()
)

export const markExecutedSuccess = createAction(
  todosActionsType.MARK_EXECUTED_TODO_SUCCESS,
  props<{
    id,
    executed
  }>()
)

export const search = createAction(
  todosActionsType.ON_SEARCH_TODOS,
  props<{
    text
  }>()
)

export const changeOpen = createAction(
  todosActionsType.CHANGE_TODO_OPEN,
  props<{
    id,
    isOpen
  }>()
)
