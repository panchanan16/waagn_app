const mysql = require('mysql');

let con = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000,
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'waagn_app',
    multipleStatements: true,
})
con.getConnection((error) => {
    if (!!error) {
        console.log('there is an error bro!' + error)
    } else {
        console.log('connected to database! 💽🛜')
    }
})
module.exports = con