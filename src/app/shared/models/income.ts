import * as moment from 'moment';
import 'moment/locale/fr';
import {Account} from '../enum/account.enum';
import {TimeService} from '../services/time.service';
import {FirebaseEntity,FirebaseEntityMapping} from './firebase-entity';


export class Income extends FirebaseEntity {
    public dateMom:moment.Moment;
    public account:Account = Account.MINE;
    public label:string;
    public amount:number;
    public shared:boolean = false;
    public comment:string;
    public waiting:boolean = false;
    public recurrent:boolean = false;


    constructor(init?:Partial<Income>) {
        super(init);

        this._dateMapping.push(new FirebaseEntityMapping({from:'date', to:'dateMom'}));

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

    public get amountRecieved():number {
        return this.numberCut(this.shared?(this.amount/2):this.amount);
    }

    public get dateInput():string {
        return this.dateMom!=undefined?this.dateMom.format(TimeService.dateFormat):undefined;
    }

    public set dateInput(dat:string) {
        this.dateMom = TimeService.parseDate(dat);
        this.date = this.dateMom!=undefined?this.dateMom.valueOf():undefined;
    }
}
