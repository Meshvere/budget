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
    origin: function (origin, callback) {
        callback(null, true)
        // if (process.env.ALLOW_ORIGIN.indexOf(origin) !== -1) {
        //     callback(null, true)
        // } else {
        //     callback(new Error('not allowed by CORS'))
        // }
    }
}));

// ------------- ROUTES ----------------------------
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/incomes', function (req, res) {
    const rows = db.doQuery("SELECT * FROM income ORDER BY `date`, recurrent", queryCallback(res));
});

app.get('/income/', function (req, res) {
    let id = req.query.id;

    const rows = db.doQuery("SELECT * FROM income WHERE id = '"+id+"'", queryCallback(res));
});

app.put('/income/', function (req, res) {
    let inc = req.body.body.inc;
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = "INSERT INTO income (account, label, amount, shared, comment, waiting, recurrent, recurrent_day, recurrent_start, recurrent_stop) VALUES (" +
                "'" + inc.account.replace("'", "\'") + "', '" + inc.label.replace("'", "\'") + "', " +
                "'" + inc.amount + "', " + (inc.shared?1:0) + ", '" + inc.comment.replace("'", "\'") + "'," +
                " " + (inc.waiting?1:0) + ", " + (inc.recuurent?1:0) + ","
                " '" + inc.recurrentDay + "' , '" + inc.recurrentStart + "'," +
                " '" + inc.recurrentStop + "');"
    } else {
        sqlQuery = "UPDATE income SET account = '" + inc.account.replace("'", "\'") + "', label = '" + inc.label.replace("'", "\'") + "'" +
                ", amount = '" + inc.amount + "', shared = " + (inc.shared?1:0) + ", comment = '" + inc.comment.replace("'", "\'") + "'" +
                ", waiting = " + (inc.waiting?1:0) + ", recurrent = " + (inc.recuurent?1:0) +
                ", recurrent_day = '" + inc.recurrentDay + "' , recurrent_start = '" + inc.recurrentStart + "'" +
                ", recurrent_stop = '" + inc.recurrentStop + "' WHERE id = "+ inc.id +";"
    }

    // const rows = db.doQuery(sqlQuery, queryCallback(res));
    console.log(sqlQuery)
});

app.get('/outcomes', function (req, res) {
    const rows = db.doQuery("SELECT * FROM outcome ORDER BY `date`", queryCallback(res));
});

// ----------- FUNCTIONS ---------------

function queryCallback(res) {
    return function(err, rows) {
        if(err) {
            errHandle(res, err);

            return;
        }

        sendResponse(res, rows);
    }
}

function errHandle(res, err) {
    res.status(500);
    res.send(err.message);
}

function sendResponse(res, data) {
    return new Promise((resolve) => {
        res.status(200);
        res.send(data);
        resolve();
    });
}

// We use data attribute to store all results
function recursivePromise(promiseList, index, data, appList, appIndexList) {
    if (index < promiseList.length) {
        return promiseList[index]().then((result) => {
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


class AbstractEntity {
    var id:string;
    var date:Date;
}
