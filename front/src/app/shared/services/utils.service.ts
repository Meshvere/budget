import { Injectable } from '@angular/core';
import {EntityProperty} from '../models/entity-property';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    public static readonly roundFactor:number = 100;
    public static readonly castableTypes:string[] = ['Date', 'Boolean'];

    protected static _properties:any = {};

    public static getProperties(o:any):EntityProperty[] {
        let properties:EntityProperty[] = [];
        let className:string = o.constructor.name;

        if(this._properties[className] == undefined) {
            let props:any = Object.getOwnPropertyDescriptors(o);

            Object.keys(props).forEach(key => {
                let value:any = props[key].value;

                if(value !== undefined) {
                    properties.push(new EntityProperty({name:key, type:value.constructor.name}));
                }
            });

            this._properties[className] = properties;
        } else {
            properties = this._properties[className];
        }


        return properties;
    }

    public static castProp(prop:any, type:string):any {
        switch(type) {
            case 'Date': prop = prop != undefined?new Date(prop):undefined;break;
            case 'Boolean': prop = prop != undefined?(prop === true || prop === 'true' || prop === '1' || prop === 1):undefined;break;
        }

        return prop;
    }

    public static numberCut(num:number):number {
        return num != undefined ? Math.round(num * UtilsService.roundFactor) / UtilsService.roundFactor: num;
    }

    constructor() { }
}
