const mysql = require('mysql')
const keys = require('./keys')

const db = mysql.createConnection({
  host: keys.HOST,
  user: keys.USER,
  password: keys.PASSWORD,
  database: keys.DATABASE,
  multipleStatements: true
})

db.connect((err => {
  if(err) {
    console.log(`Error: ${err}`)
  } else {
    console.log('DATABASE connected')
  }
}))

module.exports = db
