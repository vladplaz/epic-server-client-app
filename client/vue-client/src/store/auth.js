import * as api from '../api'
import {deleteToken, getPayload, getToken, setToken} from '@/helpers/token.helper'
import Vue from 'vue'
import router from '../router'

const notifier = new Vue()

const initState = {
  userId: '',
  userName: '',
  isAuth: false,
  isResolved: false,
  imageUrl: '',
  token: ''
}

export default {
  state: {...initState},
  mutations: {
    setUser(state, user) {
      state.isAuth = !!user.token
      state.isResolved = true
      state.userName = user.userName
      state.imageUrl = user.imageUrl
      state.token = user.token
      state.userId = user.userId
    },
    logout(state) {
      state.isAuth = false
    },
    changeProfile(state, {userName, imageUrl}) {
      state.userName = userName
      state.imageUrl = imageUrl
    }
  },
  actions: {
    async login({commit}, user) {
      const data = await api.login(user)
      setToken(data.token)
      router.push({
        name:'Todos'
      })
      commit('setUser', data)
    },
    async register({commit}, user) {
      const data = await api.register(user)
      setToken(data.token)
      commit('setUser', data)
      router.push({
        name:'Todos'
      })
    },
    async getUser() {
      return await api.loadUser(getPayload().userId)
    },
    async editUser({commit}, user) {
      const data = await api.editUser(user)
      commit('changeProfile', data)
      notifier.$notify({
        text: 'User changed',
        type: 'success',
        duration: 1000
      })
    },
    logout({commit}) {
      deleteToken()
      commit('logout')
      router.push({
        name:'Auth'
      })
    },
    async loginFromStore({dispatch, commit}) {
      const token = getToken()
      if(token) {
        const user = await dispatch('getUser')
        commit('setUser', {
          ...user, token,
          userId: getPayload().userId
        })
      }
    }
  },
  getters: {
    profile: ({userName, imageUrl}) => ({
      userName,
      imageUrl
    }),
    navbar: ({userName, isAuth, imageUrl}) => ({
      userName,
      isAuth,
      imageUrl
    })
  }
}
