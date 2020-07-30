const express = require('express')
const controller = require('../controllers/user.controller')
const upload = require('../middlewares/upload.middleware')

const router = express.Router()

router.patch('/', upload.single('image'), controller.edit)
router.get('/:id', controller.getUser)

module.exports = router
