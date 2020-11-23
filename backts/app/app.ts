import {Income} from './models/income';
import {Outcome} from './models/outcome';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const exec = require('child_process').exec;
const http = require('http');
require('dotenv').config();

const Database = require('./models/database');
const db = new Database();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors({
    origin: function (origin:any, callback:any) {
        callback(null, true)
        // if (process.env.ALLOW_ORIGIN.indexOf(origin) !== -1) {
        //     callback(null, true)
        // } else {
        //     callback(new Error('not allowed by CORS'))
        // }
    }
}));

// ------------- ROUTES ----------------------------
app.get('/', function (req:any, res:any) {
    res.send('Hello World!');
});

app.get('/incomes', function (req:any, res:any) {
    const rows = db.doQuery("SELECT * FROM income ORDER BY `date`, recurrent", queryCallback(res));
});

app.get('/income/', function (req:any, res:any) {
    let id = req.query.id;

    const rows = db.doQuery("SELECT * FROM income WHERE id = '"+id+"'", queryCallback(res));
});

app.put('/income/', function (req:any, res:any) {
    let inc = new Income(req.body.body.inc);
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = inc.getInsertQuery();
    } else {
        sqlQuery = inc.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, queryCallback(res));
});

app.put('/incomes', function (req:any, res:any) {
    let rows:any[] = [];

    req.body.body.datas.forEach((rawInc:Income) => {
        let inc:Income = new Income(rawInc);
        let sqlQuery = '';

        if(inc.id == undefined) {
            sqlQuery = inc.getInsertQuery();
        } else {
            sqlQuery = inc.getUpdateQuery();
        }

        rows.push(db.doQuery(sqlQuery));
    })

    res.send([true]);
});

app.put('/outcomes', function (req:any, res:any) {
    let rows:any[] = [];

    req.body.body.datas.forEach((rawOut:Outcome) => {
        let out:Outcome = new Outcome(rawOut);
        let sqlQuery = '';

        if(out.id == undefined) {
            sqlQuery = out.getInsertQuery();
        } else {
            sqlQuery = out.getUpdateQuery();
        }

        rows.push(db.doQuery(sqlQuery));
    })

    res.send([true]);
});

app.get('/outcomes', function (req:any, res:any) {
    const rows = db.doQuery("SELECT * FROM outcome ORDER BY `date`", queryCallback(res));
});

// ----------- FUNCTIONS ---------------

function queryCallback(res) {
    return function(err:any, rows:any) {
        if(err) {
            errHandle(res, err);

            return;
        }

        sendResponse(res, rows);
    }
}

function errHandle(res:any, err:any) {
    res.status(500);
    res.send(err.message);
}

function sendResponse(res:any, data:any) {
    return new Promise((resolve) => {
        res.status(200);
        res.send(data);
        resolve();
    });
}

// We use data attribute to store all results
function recursivePromise(promiseList:any, index:any, data:any, appList:any, appIndexList:any) {
    if (index < promiseList.length) {
        return promiseList[index]().then((result:any) => {
            data.push(result);
            appList[appIndexList[index]].alreadyinstalled = true;
            return recursivePromise(promiseList, index + 1, data, appList, appIndexList);
        });
    } else {
        return new Promise((resolve) => {
            resolve(data);
        });
    }
}

let server = http.createServer(app);
server.setTimeout(10*60*1000);

server.listen(3000, function () {
    console.log('App listening on port ' + 3000);
});
