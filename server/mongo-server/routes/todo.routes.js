const express = require('express')
const controller = require('../controllers/todo.controller')

const router = express.Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.post('/delete', controller.delete)
router.patch('/', controller.edit)
router.post('/star', controller.star)
router.post('/exec', controller.exec)

module.exports = router

