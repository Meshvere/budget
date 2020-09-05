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
}

export class FirebaseEntityMapping {
    public from:string;
    public to:string;

    constructor(init?:Partial<FirebaseEntityMapping>) {
        Object.assign(this, init);
    }
}
