const express = require('express')
const app = express()
const keys = require('./keys')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./connection')
const authMiddleware = require('./middlewares/auth.middleware')

app.use(cors())
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/user/', authMiddleware, require('./routes/user.routes'))
app.use('/api/todo/', authMiddleware, require('./routes/todo.routes'))

const createDB = async() => {
  const sql = `CREATE TABLE IF NOT EXISTS Users
    (
      ID INT NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      userName VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP NOT NULL,
      imageUrl VARCHAR(255) DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRl20U-Cn3Bd2KqDtcRya79hyXIH_hRO7T1_w&usqp=CAU',
      PRIMARY KEY (ID)
    );
    
    CREATE TABLE IF NOT EXISTS Todos
    (
      ID INT NOT NULL AUTO_INCREMENT,
      text VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP NOT NULL,
      stared BOOLEAN NOT NULL DEFAULT 0,
      executed BOOLEAN NOT NULL DEFAULT 0,
      userId INT NOT NULL,
      parentId INT,
      PRIMARY KEY (ID),
      FOREIGN KEY (userId) REFERENCES Users(ID),
      FOREIGN KEY (parentId) REFERENCES Todos(ID)
    );`
  db.query(sql, (err, res) => {
    if(err) {
      throw err
    }
    console.log('Tables created')
  })
}

createDB()

const PORT = keys.PORT || 5000
app.listen(PORT, () => {
  console.log(`App listened on port ${PORT}`)
})
