import {Account} from '../../enum/account.enum';
import {TimeService} from '../../services/time.service';
import {UtilsService} from '../../services/utils.service';
import {AbstractEntity} from './abstract-entity';


export class Outcome extends AbstractEntity {
    public account:Account = Account.MINE;
    public recipient:number = 1;
    public label:string = '';
    public amount:number = 0;
    public end_of_month:boolean = false;
    public shared:boolean = false;
    public waiting:boolean = false;
    public refunded:boolean = false;
    public on_account:boolean = false;
    public comment:string = '';

    public recurrent:boolean = false;
    public day:number = 0;
    public start_on:Date = new Date(TimeService.undefinedDate);
    public end_on:Date = new Date(TimeService.undefinedDate);

    constructor(init?:Partial<Outcome>) {
        super(init);

        init = this._castDatas(init);

        Object.assign(this, init);

        if(this.amount != undefined) {
            this.amount = UtilsService.numberCut(this.amount);
        }

        this.removeNull();
    }

    public get amountPaid():number {
        return this.amount != undefined?UtilsService.numberCut(this.shared?(this.amount/2):this.amount):undefined;
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
