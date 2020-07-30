const User = require('../models/User')

module.exports.edit = async(req, res) => {
  try {
    const config = {
      userName: req.body.userName
    }
    if(req.file) {
      config.imageUrl = req.file.path
    }
    const user = await User.findByIdAndUpdate(req.userId, config, {new: true})
    return res.status(200).json({
      message: 'User updated',
      userName: user.userName,
      imageUrl: user.imageUrl
    })
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getUser = async(req, res) => {
  try {
    const user = await User.findById(req.params.id, ['userName', 'imageUrl'])
    res.status(200).json(user)
  } catch(e) {
    res.status(500).json(e)
  }
}
