import {getToken} from '../helpers/token.helper'

export const fetchTodos = async() => {
  try {
    const res = await fetch('/api/todo', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    return await res.json()
  } catch(e) {
    throw e
  }
}

export const addTodo = async(todo) => {
  try {
    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    return await res.json()
  } catch(e) {
    throw e
  }
}

export const deleteTodos = async(idsToDelete) => {
  try {
    const res = await fetch('/api/todo/delete', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(idsToDelete)
    })
    return await res.json()
  } catch(e) {
    throw e
  }
}

export const markStared = async(id, stared) => {
  try {
    const res = await fetch(`/api/todo/star`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id,stared})
    })
    return await res.json()
  } catch(e) {
    throw e
  }
}

export const markExecuted = async(id, executed) => {
  try {
    const res = await fetch(`/api/todo/exec`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id,executed})
    })
    return await res.json()
  } catch(e) {
    throw e
  }
}

export const editTodo = async(id, text) => {
  try {
    const res = await fetch(`/api/todo`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, text})
    })
    return await res.json()
  } catch(e) {
    throw e
  }
}

