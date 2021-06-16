const path = require('path')
const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const dbStorage = path.join(__dirname, "data", "app.db")
const db = new sqlite3.Database(dbStorage, (err) => {
  if (err) { return console.error(err.message) }
  console.log(`Connected to the file ${dbStorage} SQlite database.`)
})
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/people/:id', (req, res) => {
    db.get('SELECT * FROM people WHERE id = ?', [req.params.id], (err, row) => {
        if (err) { return console.error(err.message) }
        row
            ? res.send(`id: ${row.id} \t name: ${row.name} \t email: ${row.email}`)
            : res.send(`Person with id: ${req.params.id} not found`)
    })
})

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
