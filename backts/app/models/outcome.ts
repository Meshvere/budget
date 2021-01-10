import {Account} from './account.enum';
import {AbstractEntity} from './abstract-entity';

export class Outcome extends AbstractEntity {
    public date:Date;
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

        this._table = 'outcome';

        if(init != undefined) {
            if(init['account'] != undefined) {
                init.account = init['account'] == Account.MINE?Account.MINE:Account.COMMON;
            }

            Object.assign(this, init);

            if(init['amount'] != undefined) {
                this.amount = this.numberCut(this.amount);
            }
        }

        this.removeNull();
    }

    public get amountRecieved():number {
        return this.numberCut(this.shared?(this.amount/2):this.amount);
    }
}
