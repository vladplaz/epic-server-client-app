const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')

module.exports.register = async(req, res) => {
  try {
    const {email, password, userName} = req.body
    const candidate = await User.findOne({email})
    if(candidate) {
      return res.status(400).json({message: 'User exists'})
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const user = new User({
      email,
      userName,
      password: hashPassword
    })
    await user.save()
    const token = jwt.sign({
      userId: user._id
    }, keys.JWT_SECRET, {
      expiresIn: '10h'
    })
    res.status(201).json({
      message: 'User created', token,
      userName:user.userName,
      imageUrl:user.imageUrl,
      userId:user._id
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.login = async(req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) {
      return res.status(400).json({message: 'User does not exists'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({message: 'Invalid password'})
    }
    const token = jwt.sign({
      userId: user._id
    }, keys.JWT_SECRET, {
      expiresIn: '10h'
    })
    res.status(200).json({
      message: 'User connected', token,
      userName:user.userName,
      imageUrl:user.imageUrl,
      userId:user._id
    })
  } catch(e) {
    res.status(500).json(e)
  }
}
