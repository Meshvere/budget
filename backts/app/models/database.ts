import mysql = require('mysql');
import {Connection} from 'mysql';

export class Database {
    public con:Connection;

    constructor() {
        // First you need to create a connection to the database
        // Be sure to replace 'user' and 'password' with the correct values
        this.con = mysql.createConnection({
            host: '192.168.56.102', // process.env.DB_HOST,
            user: 'root', // process.env.DB_USER,
            password: 'b24acdi', // process.env.DB_PASS,
            database: 'budget', // process.env.DB_DATABASE,
            port: 3306,
            allow_origin: '*'
        });

        this.con.connect((err) => {
            if(err){
                console.log(err)
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
