import {
  addSuccess, changeOpen,
  deleteTodosSuccess,
  editSuccess,
  fetchSuccess,
  markExecutedSuccess,
  markStaredSuccess,
  search
} from '../actions/todos.actions'
import {
  findAndPush,
  findAndDelete,
  findAndModify,
  modifyTodos, searchTodosOnOptions
} from '../helpers/array.helper'
import {Action, createReducer, on} from '@ngrx/store'

export interface Todo {
  id: any,
  text: string,
  stared: boolean,
  todos: Todo[],
  executed: boolean,
  isOpen: boolean
}

export interface TodoState {
  todos: Todo[],
  isSearch: boolean,
  searchTodos: Todo[]
}

const initState = {
  todos: [],
  isSearch: false,
  searchTodos: []
}

const todoReducer = createReducer(
  initState,
  on(fetchSuccess, (state, action) => {
    return {...state, todos: modifyTodos(action.todos)}
  }),
  on(addSuccess, (state, action) => {
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
      return {...state, todos: [newTodo, ...state.todos]}
    }
    return {...state, todos: findAndPush(newTodo, parent, state.todos.slice())}
  }),
  on(editSuccess, (state, action) => {
    const {text, id} = action
    return {
      ...state,
      todos: findAndModify(text, 'text', id, state.todos.slice())
    }
  }),
  on(markStaredSuccess, (state, action) => {
    const {stared, id} = action
    return {
      ...state,
      todos: findAndModify(stared, 'stared', id, state.todos.slice())
    }
  }),
  on(markExecutedSuccess, (state, action) => {
    const {executed, id} = action
    return {
      ...state,
      todos: findAndModify(executed, 'executed', id, state.todos.slice())
    }
  }),
  on(deleteTodosSuccess, (state, action) => {
    const {parent} = action
    return {...state, todos: findAndDelete(parent, state.todos.slice())}
  }),
  on(search, (state, action) => {
    if(!action.text) {
      return {...state, isSearch: false}
    } else {
      return {
        ...state,
        isSearch: true,
        searchTodos: searchTodosOnOptions(action.text,
          state.todos.slice())
      }
    }
  }),
  on(changeOpen, (state, action) => {
    const {id, isOpen} = action
    return {
      ...state,
      todos: findAndModify(isOpen, 'isOpen', id, state.todos.slice())
    }
  })
)

export function reducer(state: TodoState | undefined,
                        action: Action) {
  return todoReducer(state, action)
}

