import {Account} from '../enum/account.enum';
import {TimeService} from '../services/time.service';
import {AbstractEntity} from './abstract-entity';
import {UtilsService} from '../services/utils.service';


export class Outcome extends AbstractEntity {
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
    public start_on:Date;
    public end_on:Date;

    constructor(init?:Partial<Outcome>) {
        super(init);

        if(init != undefined) {
            if(init['account'] != undefined) {
                init.account = init['account'] == Account.MINE?Account.MINE:Account.COMMON;
            }

            Object.assign(this, init);

            if(init['amount'] != undefined) {
                this.amount = UtilsService.numberCut(this.amount);
            }
        }

        this.removeNull();
    }

    public get amountPaid():number {
        return UtilsService.numberCut(this.shared?(this.amount/2):this.amount);
    }

    public get refundAurelie():number {
        return UtilsService.numberCut(this.shared && this.account == Account.MINE?(this.amount/2):0);
    }

    public get refundMe():number {
        return UtilsService.numberCut(this.shared && this.account == Account.COMMON?(this.amount/2):0);
    }

    public get active():boolean {
        // return this.date != undefined && this.start_on != undefined && this.end_on != undefined && this.date.getTime() >= this.start_on.getTime() && this.date.getTime() <= this.end_on.getTime();

        return false
    }
}
