import {getToken} from '../helpers/token.helper'

export const login = async({email, password}) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email, password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!res.ok)
      return Promise.reject(await res.json())
    return await res.json()
  } catch(e) {
    return Promise.reject({message: 'Server error'})
  }
}

export const register = async({email, password, userName}) => {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email, password, userName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!res.ok)
      return Promise.reject(await res.json())
    return await res.json()
  } catch(e) {
    return Promise.reject({message: 'Server error'})
  }
}

export const loadUser = async(id) => {
  try {
    const res = await fetch(`/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if(!res.ok)
      return Promise.reject(await res.json())
    return await res.json()
  } catch(e) {
    return Promise.reject({message: 'Server error'})
  }
}

export const editUser = async(user) => {
  try {
    const fd = new FormData()
    if(user.file) {
      fd.append('image', user.file, user.file.name)
    }
    fd.append('userName', user.userName)
    const res = await fetch(`/api/user`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: fd
    })
    if(!res.ok)
      return Promise.reject(await res.json())
    return await res.json()
  } catch(e) {
    return Promise.reject({message: 'Server error'})
  }
}
