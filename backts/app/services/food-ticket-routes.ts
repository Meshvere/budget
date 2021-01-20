import {Util} from '../util';
import {FoodTicket} from '../models/food-ticket';

const Database = require('../models/database');
const db = new Database();

let express = require('express');
let foodTicketRouter = express.Router();

let table:string = 'food_ticket';

foodTicketRouter.get('/', function (req: any, res: any) {
    const rows = db.doQuery(Util.queryAll(table, ['date DESC']), Util.queryCallback(res));
});

foodTicketRouter.get('/item/:id', function (req: any, res: any) {
    let id = req.params.id;

    const rows = db.doQuery(Util.queryOneById(table, id), Util.queryCallback(res));
});

foodTicketRouter.get('/stats', function (req: any, res: any) {
    const rows = db.doQuery("SELECT CONCAT_WS('-', year(date), LPAD(month(date), 2, '0')) AS month, SUM(amount) AS amount FROM food_ticket ft GROUP BY CONCAT_WS('-', year(date), LPAD(month(date), 2, '0')) ORDER BY date", Util.queryCallback(res));
});

foodTicketRouter.put('/', function (req: any, res: any) {
    let ft = new FoodTicket(req.body.body.ft);
    let sqlQuery = '';

    if(ft.id == undefined) {
        sqlQuery = ft.getInsertQuery();
    } else {
        sqlQuery = ft.getUpdateQuery();
    }

    const rows = db.doQuery(sqlQuery, Util.queryCallback(res));
});

module.exports = foodTicketRouter;
