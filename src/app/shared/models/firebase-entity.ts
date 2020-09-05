import * as moment from 'moment';
import 'moment/locale/fr';

export class FirebaseEntity {
    protected _roundFactor:number = 100;
    protected _dateMapping:FirebaseEntityMapping[] = [];

    constructor(init?:Partial<FirebaseEntity>) {
    }

    protected _initDates() {
        for(let map of this._dateMapping) {
            this[map.to] = this.parseDate(this, map.from);
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

            delete data[attr];
        }

        return date;
    }

    public toObject():any {
        let obj:any = JSON.parse(JSON.stringify(this));

        for(let elemName of Object.keys(this)) {
            if(this[elemName] != undefined && this[elemName] != null && this[elemName].constructor.name == 'Moment') {
                obj[elemName] = this[elemName].valueOf();
            }
            if(elemName.substr(0, 1) == '_') {
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
}

export class FirebaseEntityMapping {
    public from:string;
    public to:string;

    constructor(init?:Partial<FirebaseEntityMapping>) {
    }
}
