import {
  ADD_TODO, CHANGE_TODO_OPEN,
  DELETE_TODOS,
  EDIT_TODO,
  FETCH_TODOS,
  MARK_EXECUTED_TODO,
  MARK_STARED_TODO,
  ON_SEARCH_TODOS
} from '../types'
import {
  findAndPush,
  findAndModify,
  modifyTodos,
  findAndDelete,
  searchTodosOnOptions
} from '../helpers/array.helper'
import {combineReducers} from 'redux'

const initTodos = () => {

  const todos = (state = [], action) => {
    switch(action.type) {
      case FETCH_TODOS:
        return modifyTodos(action.todos)
      case ADD_TODO:
        const {parent, text, stared, id} = action
        const newTodo = {
          id,
          text,
          stared,
          todos: [],
          executed: false,
          isOpen: false
        }
        if(!parent) {
          return [newTodo, ...state]
        }
        return findAndPush(newTodo, parent, state.slice())
      case EDIT_TODO: {
        const {text, id} = action
        return findAndModify(text, 'text', id, state.slice())
      }
      case MARK_STARED_TODO: {
        const {stared, id} = action
        return findAndModify(stared, 'stared', id, state.slice())
      }
      case MARK_EXECUTED_TODO: {
        const {executed, id} = action
        return findAndModify(executed, 'executed', id, state.slice())
      }
      case CHANGE_TODO_OPEN: {
        const {id, isOpen} = action
        return findAndModify(isOpen, 'isOpen', id, state.slice())
      }
      case DELETE_TODOS: {
        const {parent} = action
        return findAndDelete(parent, state.slice())
      }
      case ON_SEARCH_TODOS:
        if(!action.text) {
          return modifyTodos([...action.todos])
        }
        return state
      default:
        return state
    }
  }

  const isSearch = (state = false, action) => {
    switch(action.type) {
      case ON_SEARCH_TODOS:
        return !!action.text
      default:
        return state
    }
  }

  const searchTodos = (state = [], action) => {
    switch(action.type) {
      case ON_SEARCH_TODOS:
        return searchTodosOnOptions(action.text,
          [...action.todos])
      default:
        return state
    }
  }

  return combineReducers({
    todos,
    isSearch,
    searchTodos
  })
}

const todos = initTodos()

export default todos
