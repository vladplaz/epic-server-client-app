const express = require('express')
const app = express()
const mongoose = require('mongoose')
const keys = require('./keys')
const cors = require('cors')
const bodyParser = require('body-parser')
const authMiddleware = require('./middlewares/auth.middleware')
const path = require('path')

mongoose.set('useFindAndModify', false)
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../../client/react-client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/react-client/build'))
})
app.use('/uploads', express.static('uploads'))
app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/user/', authMiddleware, require('./routes/user.routes'))
app.use('/api/todo/', authMiddleware, require('./routes/todo.routes'))

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('MONGO connected')
})

const PORT = keys.PORT || 5000
app.listen(PORT, () => {
  console.log(`App listened on port ${PORT}`)
})
