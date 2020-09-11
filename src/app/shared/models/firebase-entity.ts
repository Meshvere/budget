import * as moment from 'moment';
import 'moment/locale/fr';
import {TimeService} from '../services/time.service';

export class FirebaseEntity implements FirebaseEntityI {
    public id:string;
    public date:number;
    protected _roundFactor:number = 100;
    protected _dateMapping:FirebaseEntityMapping[] = [];

    constructor(init?:Partial<FirebaseEntity>) {
        if(init != undefined && init.date != undefined) {
            this.date = init.date;
        }
    }

    protected _initDates() {
        for(let map of this._dateMapping) {
            this[map.to] = this.parseDate(this, map.from);

            if(this[map.to] != undefined) {
                this[map.from] = this[map.to].valueOf();
            }
        }
    }

    public parseDate(data:any, attr?:string):moment.Moment {
        let date:moment.Moment;

        if(data != undefined) {
            if(data != undefined && attr == undefined) {
                date = moment(data);
            } else if(data[attr] != undefined && data[attr] != null) {
                date = moment(data[attr]);
            }
        }

        return date;
    }

    public toObject():any {
        let obj:any = JSON.parse(JSON.stringify(this));

        let removeField:string[] = [];

        for(let map of this._dateMapping) {
            removeField.push(map.to);
        }

        for(let elemName of Object.keys(this)) {
            if(elemName.substr(0, 1) == '_' || removeField.indexOf(elemName) >= 0) {
                delete obj[elemName];
            } else if(this[elemName] != undefined && this[elemName] != null && this[elemName].constructor.name == 'Moment') {
                obj[elemName] = this[elemName].valueOf();
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

export class FirebaseEntityMapping {
    public from:string;
    public to:string;

    constructor(init?:Partial<FirebaseEntityMapping>) {
        Object.assign(this, init);
    }
}

export interface FirebaseEntityI {
    id:string;
    date:number;
    monthKey:string;

    parseDate(data:any, attr?:string):moment.Moment;
    toObject():any;
    numberCut(num:number):number;
    removeNull();
    getMonth(field:string):string;
}
