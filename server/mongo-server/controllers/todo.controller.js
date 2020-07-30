const Todo = require('../models/Todo')

const mapTodos = (todos, server) => {
  return todos.map(t => {
    const children = server.filter(s => s.parent + '' === t._id + '')
    return {
      id: t._id,
      text: t.text,
      executed: t.executed,
      stared: t.stared,
      parent: t.parent,
      todos: mapTodos(children, server)
    }
  })
}

module.exports.getAll = async(req, res) => {
  try {
    let todos_server = await Todo.find({user: req.userId},
      ['parent', 'text', 'stared', 'executed'],
      {sort: {createdAt: -1}})
    let todos = todos_server.filter(t => !t.parent)
    todos = mapTodos(todos, todos_server)
    res.status(200).json(todos)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.create = async(req, res) => {
  try {
    const toCreate = {
      text: req.body.text,
      user: req.userId,
      stared: req.body.stared
    }
    if(req.body.parent) {
      toCreate.parent = req.body.parent
    }
    const todo = new Todo(toCreate)
    await todo.save()
    res.status(200).json({id:todo._id})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.edit = async(req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.body.id, {
      text: req.body.text
    })
    res.status(200).json({message: 'Todo updated'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.delete = async(req, res) => {
  try {
    for(let i = 0; i < req.body.length; i++) {
      await Todo.findByIdAndDelete(req.body[i])
    }
    res.status(200).json({message: 'Todo deleted'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.star = async(req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.body.id, {
      stared: req.body.stared
    })
    res.status(200).json({message: 'stared complete'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.exec = async(req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.body.id, {
      executed: req.body.executed
    })
    res.status(200).json({message: 'execute complete'})
  } catch(e) {
    res.status(500).json(e)
  }
}
