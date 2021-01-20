import * as moment from 'moment';
import 'moment/locale/fr';
import {TimeService} from '../../services/time.service';
import {UtilsService} from '../../services/utils.service';
import {EntityProperty} from './entity-property';

export class AbstractEntity implements AbstractEntityI {
    public id:number = -1;
    public date:Date = new Date(TimeService.undefinedDate);

    constructor(init?:Partial<AbstractEntity>) {
    }

    protected _castDatas(src?:Partial<AbstractEntity>):Partial<AbstractEntity> {
        if(src == undefined) {
            src = this;
        }
        let properties:EntityProperty[] = UtilsService.getProperties(this);
        let castableProps:EntityProperty[] = properties.filter(prop => UtilsService.castableTypes.indexOf(prop.type) >= 0);

        this._purgeDefault(properties);

        if(src != undefined) {
            castableProps.forEach(prop => {
                src[prop.name] = UtilsService.castProp(src[prop.name], prop.type);
            });
        }

        this._purgeDefault(properties, src);

        return src;
    }

    public toObject():any {
        let properties:EntityProperty[] = UtilsService.getProperties(this);

        let obj:any = JSON.parse(JSON.stringify(this));

        properties.forEach(prop => {
            if(prop.name.substr(0, 1) == '_') {
                delete obj[prop.name];
            } else if(UtilsService.castableTypes.indexOf(prop.type) >= 0) {
                obj[prop.name] = UtilsService.castProp(obj[prop.name], prop.type);

                if(prop.type == 'Date') {
                    obj[prop.name] = TimeService.yyyyMmDd(obj[prop.name]);
                }
            }
        })

        return obj;
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

    protected _purgeDefault(properties:EntityProperty[], src?:any) {
        if(src == undefined) {
            src = this;
        }
        properties.forEach(prop => {
            if(prop.type == 'Date') {
                src[prop.name] = TimeService.purgeDefaultDate(src[prop.name]);
            } else if(prop.type == 'String') {
                src[prop.name] = src[prop.name] == ''?undefined:src[prop.name];
            } else if(prop.type == 'Number') {
                src[prop.name] = src[prop.name] == 0?undefined:src[prop.name];
            }

            if(prop.name == 'id') {
                if(src[prop.name] != undefined && src[prop.name] <= 0) {
                    src[prop.name] = undefined;
                }
            }
        });
    }
}

export interface AbstractEntityI {
    id:number;
    date:Date;
    monthKey:string;

    toObject():any;
    removeNull();
    getMonth(field:string):string;
}
