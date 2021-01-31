import {Util} from '../util';

export class AbstractEntity {
    public id:string;

    protected _table:string;

    protected _roundFactor:number = 100;

    constructor(init?:Partial<AbstractEntity>) {
    }

    public toObject():any {
        let obj:any = JSON.parse(JSON.stringify(this));

        let removeField:string[] = [];

        for(let elemName of Object.keys(this)) {
            if(elemName.substr(0, 1) == '_' || removeField.indexOf(elemName) >= 0) {
                delete obj[elemName];
            }
        }

        return obj;
    }

    public numberCut(num:number):number {
        return Math.round(num * this._roundFactor) / this._roundFactor;
    }

    public removeNull() {
        for(let key of Object.keys(this)) {
            if(this[key] == null) {
                this[key] = undefined;
            }
        }
    }

    public getInsertQuery():string {
        let fields:string[] = [];
        let values:string[] = [];

        Util.getProperties(this).forEach(field => {
            if(this[field] != undefined) {
                let value:any = this[field];

                switch(typeof this[field]) {
                    case 'boolean':
                        value = value === true?1:0;
                    break;
                    case 'string':
                        value = "'" + value.replace("'", "''") + "'";
                    break;
                }

                fields.push(field);
                values.push(value);
            }
        });

        let sql:string = 'INSERT INTO ' + this._table+' (' + fields.join(', ') + ') VALUES (' + values.join(', ') + ');';

        return sql;
    }

    public getUpdateQuery():string {
        let sets:string[] = [];

        Util.getProperties(this).forEach(field => {
                let value:any = this[field];

                if(this[field] != undefined) {
                    switch(typeof this[field]) {
                        case 'boolean':
                            value = value === true?1:0;
                        break;
                        case 'string':
                            value = "'" + value.replace("'", "''") + "'";
                        break;
                    }
                } else {
                    value = 'NULL';
                }

                sets.push(field+' = '+value);
        });

        let sql:string = 'UPDATE ' + this._table + ' SET ' + sets.join(', ') + ' WHERE id = ' + this.id;

        return sql;
    }
}
