import {AbstractDatedEntity} from './abstract-dated-entity';
import {Account} from './account.enum';

export class Income extends AbstractDatedEntity {
    public account:Account = Account.MINE;
    public label:string = '';
    public amount:number;
    public shared:boolean = false;
    public on_account:boolean = false;
    public comment:string = '';
    public waiting:boolean = false;

    public recurrent:boolean = false;
    public recurrent_day:number;
    public recurrent_start:Date;
    public recurrent_stop:Date;


    constructor(init?:Partial<Income>) {
        super(init);

        this._table = 'income';

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
