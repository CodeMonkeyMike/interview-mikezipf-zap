const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const dbStorage = path.join(__dirname, "app.db")

const migrations = (dbStorage) => {
    const db = new sqlite3.Database(dbStorage, (err) => {
      if (err) { return console.error(err.message) }
      console.log(`Connected to the file ${dbStorage} SQlite database.`)
    })
    // KISS - just clear out any table and repopulate
    db.run(`DELETE FROM people`)
    db.run(`
    CREATE TABLE IF NOT EXISTS people (
        id INTEGER NOT NULL PRIMARY KEY,
        name text NOT NULL,
        email text
    )`)
    db.run(`INSERT INTO people(name, email) VALUES(?, ?)`, ['Mike', 'mike@mike.com'], function(err) {
        if (err) { return console.log(err.message) }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    db.each(`SELECT * FROM people`, (err, row) => {
        if (err) {return console.log(err.message) }
        console.log(`id: ${row.id} \t name: ${row.name} \t email: ${row.email}`)
    })

    db.close((err) => {
        if (err) { return console.error(err.message) }
        console.log('Close the database connection.')
    })
}

exports.migrations = migrations
// TODO: Test code remove
migrations(dbStorage)
