import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';

@Injectable({
    providedIn: 'root'
})
export class TimeService {
    public static dateFormat:string = 'YYYY-MM-DD';
    public static yearMonthFormat:string = 'YYYY-MM';

    public static timezoneOffset:number = new Date().getTimezoneOffset();

    constructor() { }

    public static parseDate(ts:number|string):moment.Moment {
        let format:string;

        if(typeof ts == 'number') {
            ts += TimeService.timezoneOffset*60;
        } else if(typeof ts == 'string') {
            let tzDelta:number = (TimeService.timezoneOffset/60*-1);
            let tz:string = (tzDelta>0?'+':'-')+(Math.abs(tzDelta)<10?'0':'') + tzDelta;
            ts += ' ' + tz +':00';

            format = "YYYY-MM-DD Z";
        }

        return moment(ts, format).utc(true);
    }
}
