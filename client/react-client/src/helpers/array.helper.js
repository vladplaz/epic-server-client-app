export const modifyTodos = (todos) => {
  return todos.map(t => {
    return {
      ...t,
      isOpen: false,
      todos: modifyTodos(t.todos)
    }
  })
}

export const findAndPush = (todo, parent, todos) => {
  return todos.map(t => {
    if(t.id === parent) {
      return {
        ...t,
        isOpen: true,
        todos: [todo, ...t.todos]
      }
    }
    return {
      ...t,
      todos: [...findAndPush(todo, parent, t.todos)]
    }
  })
}

export const findAndModify = (value, type = 'text', id, todos) => {
  return todos.map(t => {
    if(t.id === id) {
      if(type === 'isOpen' && !value) {
        return {
          ...t,
          [type]: value,
          todos: [...modifyTodos(t.todos)]
        }
      }
      return {
        ...t,
        [type]: value
      }
    }
    return {
      ...t,
      todos: [...findAndModify(value, type, id, t.todos)]
    }
  })
}


export const findAndDelete = (parent, todos) => {
  let res = []
  todos.forEach(t => {
    if(t.id !== parent) {
      res.push({
        ...t,
        todos: [...findAndDelete(parent, t.todos)]
      })
    }
  })
  return res
}

const containsChild = (text, todos) => {
  let res = false
  todos.forEach(t => {
    if(t.text.toLowerCase().includes(text)) {
      res = true
    }
    res = res || containsChild(text, t.todos)
  })
  return res
}

export const searchTodosOnOptions = (text, todos) => {
  let arr = []
  todos.forEach(t => {
    if(t.text.toLowerCase().includes(text) ||
      containsChild(text, t.todos)) {
      arr.push({
        ...t,
        todos: [...searchTodosOnOptions(text, t.todos)],
        isOpen: t.todos.length > 0
      })
    }
  })
  return arr
}

export const createIdsArray = (todos) => {
  let arr = []
  todos.forEach(t => {
    arr.push(t.id)
    arr = [...arr, ...createIdsArray(t.todos)]
  })
  return arr
}
