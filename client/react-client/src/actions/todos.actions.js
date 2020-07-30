import * as api from '../api'
import {
  ADD_TODO,
  CHANGE_TODO_OPEN,
  DELETE_TODOS, EDIT_TODO,
  FETCH_TODOS,
  MARK_EXECUTED_TODO,
  MARK_STARED_TODO, ON_SEARCH_TODOS
} from '../types'

export const fetchTodos = () => dispatch => api.fetchTodos()
  .then(todos => {
    dispatch({
      type: FETCH_TODOS,
      todos
    })
  })

export const addTodo = ({text, stared = false, parent = null}) =>
  dispatch =>
    api.addTodo({
      text,
      stared,
      parent
    }).then(({id}) => {
      dispatch({
        type: ADD_TODO,
        text,
        parent,
        stared,
        id
      })
    })

export const deleteTodo = (parent, toDelete) =>
  dispatch => {
    dispatch({
      type: DELETE_TODOS,
      parent
    })
    api.deleteTodos(toDelete)
  }

export const markExecuted = (id, executed) =>
  dispatch => {
    dispatch({
      type: MARK_EXECUTED_TODO,
      id,
      executed
    })
    return api.markExecuted(id, executed)
  }

export const markStared = (id, stared) =>
  dispatch => {
    dispatch({
      type: MARK_STARED_TODO,
      id,
      stared
    })
    return api.markStared(id, stared)
  }

export const changeOpen = (id, isOpen) =>
  dispatch => {
    dispatch({
      type: CHANGE_TODO_OPEN,
      id,
      isOpen
    })
  }

export const onSearch = (text, todos) =>
  dispatch => {
    dispatch({
      type: ON_SEARCH_TODOS,
      text,
      todos
    })
  }

export const editTodo = (id, text) =>
  dispatch => {
    dispatch({
      type: EDIT_TODO,
      id,
      text
    })
    return api.editTodo(id, text)
  }
