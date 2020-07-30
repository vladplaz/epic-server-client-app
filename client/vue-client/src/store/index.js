import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import todos from './todos'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth, todos
  }
})
