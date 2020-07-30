const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const db = require('../connection')

module.exports.register = async(req, res) => {
  try {
    const {email, password, userName} = req.body
    const sqlCandidate = `SELECT * FROM Users WHERE email = "${email}"`
    db.query(sqlCandidate, async (err, result) => {
      if(err) {
        return res.status(500).json(err)
      }
      if(result&&result.length) {
        return res.status(400).json({message: 'User exists'})
      }
      const hashPassword = await bcrypt.hash(password, 8)
      const user = {
        email,
        userName,
        password:hashPassword
      }
      const sqlUser = `INSERT INTO Users SET ?`
      db.query(sqlUser, user, (err, result2) => {
        if(err) {
          return res.status(500).json(err)
        }
        const userId = result2.insertId
        const token = jwt.sign({
          userId
        }, keys.JWT_SECRET, {
          expiresIn: '10h'
        })
        res.status(201).json({
          message: 'User created',
          token,
          userName,
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRl20U-Cn3Bd2KqDtcRya79hyXIH_hRO7T1_w&usqp=CAU',
          userId
        })
      })
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.login = async(req, res) => {
  try {
    const {email, password} = req.body
    const sqlEmail = `SELECT * FROM Users WHERE email = "${email}"`
    db.query(sqlEmail, async(err, result) => {
      if(err) {
        res.status(500).json(err)
      }
      if(!result||!result.length) {
        return res.status(400).json({message: 'User does not exists'})
      }
      const isMatch = await bcrypt.compare(password, result[0].password)
      if(!isMatch) {
        return res.status(400).json({message: 'Invalid password'})
      }
      const token = jwt.sign({
        userId: result[0].ID
      }, keys.JWT_SECRET, {
        expiresIn: '10h'
      })
      res.status(201).json({
        message: 'User connected',
        token,
        userName: result[0].userName,
        imageUrl: result[0].imageUrl,
        userId: result[0].ID
      })
    })
  } catch(e) {
    res.status(500).json(e)
  }
}
