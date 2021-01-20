export class Util {
    public static getProperties(obj: any): string[] {
        const result = [];

        for (let property in obj) {
            if (obj.hasOwnProperty(property) && !property.startsWith('_')) {
                result.push(property);
            }
        }

        return result;
    }

    public static queryCallback(res) {
        return function(err:any, rows:any) {
            if(err) {
                Util.errHandle(res, err);

                return;
            }

            Util.sendResponse(res, rows);
        }
    }

    public static errHandle(res:any, err:any) {
        res.status(500);
        res.send(err.message);
    }

    public static sendResponse(res:any, data:any) {
        return new Promise((resolve) => {
            res.status(200);
            res.send(data);
            resolve();
        });
    }

    public static queryAll(table:string, order:string[]):string {
        let query:string = "SELECT * FROM " + table;

        if(order.length > 0) {
            query += " ORDER BY " + order.join(', ');
        }

        return query;
    }

    public static queryOneById(table:string, id:string):string {
        let query:string = "SELECT * FROM " + table + " WHERE id = '"+id+"'";

        return query;
    }
}
