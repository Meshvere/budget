import {Account} from '../enum/account.enum';
import {AbstractEntity} from './abstract-entity';
import {TimeService} from '../services/time.service';
import {UtilsService} from '../services/utils.service';


export class Income extends AbstractEntity {
    public account:Account = Account.MINE;
    public label:string = '';
    public amount:number = 0;
    public shared:boolean = false;
    public on_account:boolean = false;
    public comment:string = '';
    public waiting:boolean = false;

    public recurrent:boolean = false;
    public recurrent_day:number = 0;
    public recurrent_start:Date = new Date(TimeService.undefinedDate);
    public recurrent_stop:Date = new Date(TimeService.undefinedDate);

    constructor(init?:Partial<Income>) {
        super(init);

        init = this._castDatas(init);

        Object.assign(this, init);

        if(this.amount != undefined) {
            this.amount = UtilsService.numberCut(this.amount);
        }

        this.removeNull();
    }

    public get amountRecieved():number {
        return UtilsService.numberCut(this.shared?(this.amount/2):this.amount);
    }
}
