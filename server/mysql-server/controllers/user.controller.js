const db = require('../connection')

module.exports.edit = async(req, res) => {
  try {
    const config = {
      userName: req.body.userName
    }
    if(req.file) {
      config.imageUrl = req.file.path
    }
    const sql = `UPDATE Users SET ? WHERE ID = ${req.userId}`
    db.query(sql, config, (err, result) => {
      if(err)
        return res.status(500).json(err)
      const sqlUser = `SELECT * FROM Users WHERE ID = ${req.userId}`
      db.query(sqlUser, (err, result2) => {
        if(err) {
          return res.status(500).json(err)
        }
        return res.status(200).json({
          message: 'User updated',
          userName: result2[0].userName,
          imageUrl: result2[0].imageUrl
        })
      })
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getUser = async(req, res) => {
  try {
    const sql = `SELECT * FROM Users WHERE ID = ${req.params.id}`
    db.query(sql, (err, result) => {
      if(err) {
        return res.status(500).json(err)
      }
      if(result && result.length) {
        return res.status(200).json({
          userName: result[0].userName,
          imageUrl: result[0].imageUrl
        })
      }
      res.status(500).json({message: 'User does not exist'})
    })
  } catch(e) {
    res.status(500).json(e)
  }
}
