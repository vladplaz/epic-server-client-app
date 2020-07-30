import * as api from '../api'
import {
  findAndDelete,
  findAndModify, findAndPush,
  createIdsArray, searchTodosOnOptions, modifyTodos
} from '../helpers/array.helper'
import Vue from 'vue'
const notifier = new Vue()

const initState = {
  todos: [],
  isSearch: false,
  searchTodos: []
}

export default {
  state: {...initState},
  mutations: {
    setTodos(state, todos) {
      state.todos = modifyTodos(todos)
    },
    add(state, todo) {
      const {parent, text, stared = false, id} = todo
      const newTodo = {
        id,
        text,
        stared,
        todos: [],
        executed: false,
        isOpen: false
      }
      if(!parent) {
        state.todos = [newTodo, ...state.todos]
      }
      state.todos = findAndPush(newTodo, parent, state.todos.slice())
    },
    edit(state, todo) {
      const {text, id} = todo
      state.todos = findAndModify(text, 'text', id, state.todos.slice())
    },
    markStared(state, todo) {
      const {stared, id} = todo
      state.todos = findAndModify(stared, 'stared', id, state.todos.slice())
    },
    markExecuted(state, todo) {
      const {executed, id} = todo
      state.todos = findAndModify(executed, 'executed', id, state.todos.slice())
    },
    deleteTodos(state, parent) {
      state.todos = findAndDelete(parent, state.todos.slice())
    },
    search(state, text) {
      if(!text) {
        state.isSearch = false
      } else {
        state.isSearch = true
        state.searchTodos = searchTodosOnOptions(text,
          state.todos.slice())
      }
    },
    changeOpen(state, todo) {
      const {id, isOpen} = todo
      state.todos = findAndModify(isOpen, 'isOpen', id, state.todos.slice())
    }
  },
  actions: {
    async fetch({commit}) {
      const data = await api.fetchTodos()
      commit('setTodos', data)
    },
    async add({commit}, todo) {
      const {id} = await api.addTodo(todo)
      commit('add', {...todo, id})
      notifier.$notify({
        text: 'Todo added',
        type: 'success',
        duration: 1000
      })
    },
    async edit({commit}, todo) {
      commit('edit', todo)
      await api.editTodo(todo)
      notifier.$notify({
        text: 'Todo edited',
        type: 'success',
        duration: 1000
      })
    },
    async markStared({commit}, todo) {
      commit('markStared', todo)
      await api.markStared(todo)
      notifier.$notify({
        text: 'Todo marked',
        type: 'success',
        duration: 1000
      })
    },
    async markExecuted({commit}, todo) {
      commit('markExecuted', todo)
      await api.markExecuted(todo)
      notifier.$notify({
        text: 'Todo executed',
        type: 'success',
        duration: 1000
      })
    },
    async deleteTodos({commit}, todo) {
      commit('deleteTodos', todo.id)
      await api.deleteTodos([todo.id, ...createIdsArray(todo.todos)])
      notifier.$notify({
        text: 'Todo deleted',
        type: 'success',
        duration: 1000
      })
    },
    async changeOpen({commit}, todo) {
      commit('changeOpen', todo)
    },
    async onSearch({commit}, text) {
      commit('search', text)
    }
  },
  getters: {
    todos: s => s.todos,
    isSearch: s => s.isSearch,
    searchTodos: s => s.searchTodos
  }
}
