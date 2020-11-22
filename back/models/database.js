const mysql = require('mysql');




class Database {
    constructor() {
        // First you need to create a connection to the database
        // Be sure to replace 'user' and 'password' with the correct values
        this.con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
        });
        
        this.con.connect((err) => {
            if(err){
                console.log('Error connecting to Db');
            return;
            }
            console.log('Connection established');
        });
    }

    doQuery(request, callback) {
        return this.con.query(request, callback);
    }
}

module.exports = Database;