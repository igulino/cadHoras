const database = require('mysql');

module.exports = (
    database.createPool({
        host: "localhost",
        user: "root",
        database: "pontohora",
        password: "password"
    })
)