import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import {EntityProperty} from '../models/entities/entity-property';
import {DatePipe, CurrencyPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    public static locale:string;
    public static readonly roundFactor:number = 100;
    public static readonly castableTypes:string[] = ['Date', 'Boolean'];

    protected static _properties:any = {};

    public static getProperties(o:any):EntityProperty[] {
        let properties:EntityProperty[] = [];
        let className:string = o.constructor.name;

        if(UtilsService._properties[className] == undefined) {
            let props:any = Object.getOwnPropertyDescriptors(o);

            Object.keys(props).forEach(key => {
                let value:any = props[key].value;

                if(value !== undefined) {
                    properties.push(new EntityProperty({name:key, type:value.constructor.name}));
                }
            });

            UtilsService._properties[className] = properties;
        } else {
            properties = UtilsService._properties[className];
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
        return num != undefined ? Math.round(num * this.roundFactor) / this.roundFactor: num;
    }

    public static dateToString(date:Date, fullDate:boolean = true):string {
        if(typeof date == 'string') {
            return date;
        }
        if(date == undefined) {
            return undefined;
        }

        let pipe:DatePipe = new DatePipe(UtilsService.locale);

        return pipe.transform(date, fullDate?'dd/MM/yyyy':'MMM-y');
    }

    public static currencyToString(amount:number):string {
        if(amount == undefined) {
            return undefined;
        }

        let pipe:CurrencyPipe = new CurrencyPipe(UtilsService.locale, '€');

        return pipe.transform(amount);
    }

    public static uniqId():string {
        return Math.round(Math.random()*Math.random()*1000000*Date.now()).toString();
    }

    constructor(
        @Inject(LOCALE_ID) public locale: string,
    ) {
        UtilsService.locale = locale;
    }
}
