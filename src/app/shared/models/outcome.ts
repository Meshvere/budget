import * as moment from 'moment';
import 'moment/locale/fr';
import {Account} from '../enum/account.enum';
import {TimeService} from '../services/time.service';
import {FirebaseEntity,FirebaseEntityMapping} from './firebase-entity';


export class Outcome extends FirebaseEntity {
    public id:string;
    public dateMom:moment.Moment;
    public account:Account = Account.MINE;
    public recipient:string;
    public label:string;
    public amount:number;
    public end_of_month:boolean = false;
    public shared:boolean = false;
    public waiting:boolean = false;
    public refunded:boolean = false;
    public on_account:boolean = false;
    public comment:string;

    public recurrent:boolean = false;
    public day:number = 0;
    public start_on:number;
    public startOnMom:moment.Moment;
    public end_on:number;
    public endOnMom:moment.Moment;

    constructor(init?:Partial<Outcome>) {
        super(init);

        this._dateMapping.push(new FirebaseEntityMapping({from:'date', to:'dateMom'}));
        this._dateMapping.push(new FirebaseEntityMapping({from:'start_on', to:'startOnMom'}));
        this._dateMapping.push(new FirebaseEntityMapping({from:'end_on', to:'endOnMom'}));

        if(init != undefined) {
            if(init['account'] != undefined) {
                init.account = init['account'] == Account.MINE?Account.MINE:Account.COMMON;
            }

            Object.assign(this, init);

            if(init['amount'] != undefined) {
                this.amount = this.numberCut(this.amount);
            }

            this._initDates();
        }

        this.removeNull();
    }

    public get amountPaid():number {
        return this.numberCut(this.shared?(this.amount/2):this.amount);
    }

    public get refundAurelie():number {
        return this.numberCut(this.shared && this.account == Account.MINE?(this.amount/2):0);
    }

    public get refundMe():number {
        return this.numberCut(this.shared && this.account == Account.COMMON?(this.amount/2):0);
    }

    public get dateInput():string {
        return this.dateMom!=undefined?this.dateMom.format(TimeService.dateFormat):undefined;
    }

    public set dateInput(dat:string) {
        this.dateMom = this.parseDate(dat);
        this.date = this.dateMom!=undefined?this.dateMom.valueOf():undefined;

        this.removeNull();
    }

    public get startOnInput():string {
        return this.startOnMom!=undefined?this.startOnMom.format(TimeService.dateFormat):undefined;
    }

    public set startOnInput(dat:string) {
        this.startOnMom = this.parseDate(dat);
        this.start_on = this.startOnMom!=undefined?this.startOnMom.valueOf():undefined;

        this.removeNull();
    }

    public get endOnInput():string {
        return this.endOnMom!=undefined?this.endOnMom.format(TimeService.dateFormat):undefined;
    }

    public set endOnInput(dat:string) {
        this.endOnMom = this.parseDate(dat);
        this.end_on = this.endOnMom!=undefined?this.endOnMom.valueOf():undefined;

        this.removeNull();
    }

    public get active():boolean {
        // return this.date != undefined && this.start_on != undefined && this.end_on != undefined && this.date.getTime() >= this.start_on.getTime() && this.date.getTime() <= this.end_on.getTime();

        return false
    }
}
