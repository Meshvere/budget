import * as moment from 'moment';
import 'moment/locale/fr';
import {TimeService} from '../services/time.service';

export class AbstractEntity implements AbstractEntityI {
    public id:string;
    public date:Date;
    protected _roundFactor:number = 100;

    constructor(init?:Partial<AbstractEntity>) {
        if(init != undefined && init.date != undefined) {
            console.log('----------------------------')
            console.log(init.date)
            this.date = new Date(init.date);
            console.log(this.date)
        }
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

    public getMonth(field:string):string {
        let dat:moment.Moment = TimeService.parseDate(this[field]);

        return dat.format(TimeService.yearMonthFormat);
    }

    public get monthKey():string {
        return TimeService.parseDate(this.date).format(TimeService.yearMonthFormat);
    }
}

// export class AbstractEntityMapping {
//     public from:string;
//     public to:string;

//     constructor(init?:Partial<AbstractEntityMapping>) {
//         Object.assign(this, init);
//     }
// }

export interface AbstractEntityI {
    id:string;
    date:Date;
    monthKey:string;

    toObject():any;
    numberCut(num:number):number;
    removeNull();
    getMonth(field:string):string;
}
