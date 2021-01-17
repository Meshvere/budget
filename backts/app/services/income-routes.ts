import {Income} from '../models/income';

const Database = require('../models/database');
const db = new Database();

let express = require('express');
let incomeRouter = express.Router();

let table:string = 'income';

// middleware that is specific to this router
// incomeRouter.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route
incomeRouter.get('/', function(req: any, res: any) {
  res.send('Birds home page');
});
// define the about route
incomeRouter.get('/list', function (req: any, res: any) {
    const rows = db.doQuery("SELECT * FROM " + table + " ORDER BY date, recurrent", queryCallback(res));
});

incomeRouter.get('/:id', function (req:any, res:any) {
    let id = req.params.id;

    const rows = db.doQuery("SELECT * FROM " + table + " WHERE id = '"+id+"'", queryCallback(res));
});

incomeRouter.put('/income/', function (req:any, res:any) {
    let inc = new Income(req.body.body.inc);
    let sqlQuery = '';

    if(inc.id == undefined) {
        sqlQuery = inc.getInsertQuery();
    } else {
        sqlQuery = inc.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, queryCallback(res));
});

module.exports = incomeRouter;



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
