import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';

@Injectable({
    providedIn: 'root'
})
export class TimeService {
    public static readonly undefinedDate:string = '1970-01-01';

    public static readonly dateFormat:string = 'YYYY-MM-DD';
    public static readonly yearMonthFormat:string = 'YYYY-MM';

    public static readonly timezoneOffset:number = new Date().getTimezoneOffset();

    constructor() { }

    public static parseDate(ts:Date):moment.Moment {
        let format:string = "YYYY-MM-DD Z";

        // if(typeof ts == 'number') {
        //     ts += TimeService.timezoneOffset*60;
        // } else if(typeof ts == 'string') {
        //     let tzDelta:number = (TimeService.timezoneOffset/60*-1);
        //     let tz:string = (tzDelta>0?'+':'-')+(Math.abs(tzDelta)<10?'0':'') + tzDelta;
        //     ts += ' ' + tz +':00';

        //     format = "YYYY-MM-DD Z";
        // }

        return moment(ts, format).utc(true);
    }

    public static yyyyMmDd(date:Date, separator:string = '-'):string {
        if(date == undefined) {
            return undefined;
        }

        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [date.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
                ].join(separator);
    }

    public static purgeDefaultDate(date:Date):Date {
        return date == undefined || TimeService.yyyyMmDd(date) == TimeService.undefinedDate?undefined:date;
    }
}
