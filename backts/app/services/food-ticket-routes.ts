import {FoodTicket} from '../models/food-ticket';

const Database = require('../models/database');
const db = new Database();

let express = require('express');
let foodTicketRouter = express.Router();

let table:string = 'food_ticket';

foodTicketRouter.get('/', function (req: any, res: any) {
    const rows = db.doQuery("SELECT * FROM food_ticket ORDER BY date DESC", queryCallback(res));
});

foodTicketRouter.get('/stats', function (req: any, res: any) {
    const rows = db.doQuery("SELECT CONCAT_WS('-', year(date), LPAD(month(date), 2, '0')) AS month, SUM(amount) AS amount FROM food_ticket ft GROUP BY CONCAT_WS('-', year(date), LPAD(month(date), 2, '0')) ORDER BY date", queryCallback(res));
});

module.exports = foodTicketRouter;



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
