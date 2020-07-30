const db = require('../connection')

const mapTodos = (todos, server) => {
  todos.forEach(t => {
    const children = server.filter(s => s.parent === t.id)
    t.todos = mapTodos(children, server)
  })
  return todos
}

module.exports.getAll = async(req, res) => {
  try {
    const sql = `SELECT * FROM Todos WHERE userId = ${req.userId}`
    db.query(sql, (err, result) => {
      if(err) {
        return res.status(500).json(err)
      }
      const mappedResult = result.map(t => ({
        id: t.ID,
        text: t.text,
        stared: t.stared !== 0,
        executed: t.executed !== 0,
        userId: t.userId,
        parent: t.parentId
      }))
      let parents = mappedResult.filter(t => !t.parent)
      todos = mapTodos(parents, mappedResult)
      res.status(200).json(todos)
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.create = async(req, res) => {
  try {
    const config = {
      text: req.body.text,
      userId: req.userId
    }
    if(req.body.parent) {
      config.parentId = req.body.parent
    }
    const sql = `INSERT INTO Todos SET ? , createdAt = CURDATE()`
    db.query(sql, config, (err, result) => {
      if(err) {
        return res.status(500).json(err)
      }
      res.status(200).json({id: result.insertId})
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.edit = async(req, res) => {
  try {
    const sql = `UPDATE Todos SET text = ${req.body.text} WHERE ID = ${req.body.id}`
    db.query(sql, (err, res) => {
      if(err) {
        return res.status(500).json(err)
      }
      res.status(200).json({message: 'stared complete'})
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.delete = async(req, res) => {
  try {
    const idsReverse = req.body.reverse()
    for(let i = 0; i < idsReverse.length; i++) {
      let sql = `DELETE FROM Todos WHERE ID = ${idsReverse[i]}`
      db.query(sql, (err) => {
        if(err) {
          return res.status(500).json(err)
        }
      })
    }
    res.status(200).json({message: 'delete complete'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.star = async(req, res) => {
  try {
    const sql = `UPDATE Todos SET stared = ${req.body.stared} WHERE ID = ${req.body.id}`
    db.query(sql, (err) => {
      if(err) {
        return res.status(500).json(err)
      }
      res.status(200).json({message: 'stared complete'})
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.exec = async(req, res) => {
  try {
    const sql = `UPDATE Todos SET executed = ${req.body.executed} WHERE ID = ${req.body.id}`
    db.query(sql, (err) => {
      if(err) {
        return res.status(500).json(err)
      }
      res.status(200).json({message: 'execute complete'})
    })
  } catch(e) {
    res.status(500).json(e)
  }
}
