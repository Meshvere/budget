import {Income} from './models/income';
import {Outcome} from './models/outcome';
import {Recipient} from './models/recipient';

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
    origin: function (origin: any, callback: any) {
        callback(null, true);
        // if (process.env.ALLOW_ORIGIN.indexOf(origin) !== -1) {
        //     callback(null, true)
        // } else {
        //     callback(new Error('not allowed by CORS'))
        // }
    }
}));

// ------------- ROUTES ----------------------------

var income = require('./services/income-routes');

app.use('/bird', income);

var foodTicket = require('./services/food-ticket-routes');
app.use('/food-ticket', foodTicket);















app.get('/', function (req: any, res: any) {
    res.send('Hello World!');
});

app.get('/incomes', function (req: any, res: any) {
    const rows = db.doQuery("SELECT * FROM income ORDER BY date, recurrent", queryCallback(res));
});

app.get('/income/', function (req: any, res: any) {
    let id = req.query.id;

    const rows = db.doQuery("SELECT * FROM income WHERE id = '"+id+"'", queryCallback(res));
});

app.put('/income/', function (req: any, res: any) {
    let inc = new Income(req.body.body.inc);
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = inc.getInsertQuery();
    } else {
        sqlQuery = inc.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, queryCallback(res));
});

app.put('/incomes', function (req: any, res: any) {
    let rows: any[] = [];

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

app.put('/income/', function (req: any, res: any) {
    let inc = new Income(req.body.body.inc);
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = inc.getInsertQuery();
    } else {
        sqlQuery = inc.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, queryCallback(res));
});



app.get('/outcomes', function (req: any, res: any) {
    const rows = db.doQuery("SELECT * FROM outcome ORDER BY date", queryCallback(res));
});

app.get('/outcome/', function (req: any, res: any) {
    let id = req.query.id;

    const rows = db.doQuery("SELECT * FROM outcome WHERE id = '"+id+"'", queryCallback(res));
});

app.put('/outcome/', function (req: any, res: any) {
    let inc = new Outcome(req.body.body.out);
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = inc.getInsertQuery();
    } else {
        sqlQuery = inc.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, queryCallback(res));
});

app.put('/outcomes', function (req: any, res: any) {
    let rows: any[] = [];

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



app.get('/recipients', function (req: any, res: any) {
    const rows = db.doQuery("SELECT * FROM recipient ORDER BY main DESC, label", queryCallback(res));
});

app.put('/recipient/', function (req: any, res: any) {
    let inc = new Recipient(req.body.body.rec);
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = inc.getInsertQuery();
    } else {
        sqlQuery = inc.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, queryCallback(res));
});



app.get('/shops', function (req: any, res: any) {
    const rows = db.doQuery("SELECT sh.id, sh.label, sh.main, sc.label AS category_label FROM shop sh JOIN shop_category sc ON (sh.id_shop_category = sc.id) ORDER BY sc.`order`, sh.main DESC", queryCallback(res));
});





// ----------- FUNCTIONS ---------------

function queryCallback(res: any) {
    return function(err: any, rows: any) {
        if(err) {
            errHandle(res, err);

            return;
        }

        sendResponse(res, rows);
    }
}

function errHandle(res: any, err: any) {
    res.status(500);
    res.send(err.message);
}

function sendResponse(res: any, data: any) {
    return new Promise((resolve) => {
        res.status(200);
        res.send(data);
        resolve();
    });
}

// We use data attribute to store all results
function recursivePromise(promiseList: any, index: any, data: any, appList: any, appIndexList: any) {
    if (index < promiseList.length) {
        return promiseList[index]().then((result: any) => {
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
