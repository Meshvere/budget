import {AbstractEntity} from './abstract-entity';
import {Income} from './income';
import {Outcome} from './outcome';

export class Summary extends AbstractEntity {
    protected _income:Income[] = [];
    public income:number;
    protected _outcome:Outcome[] = [];
    public outcome:number;
    protected _foodTicket:any[] = [];
    public refund:any[] = [];
    protected _saving:any[] = [];

    constructor(init?:Partial<Summary>) {
        super(init);

        Object.assign(this, init);
    }

    public get recurrent():number {
        let sum:number = 0;

        for(let out of this._outcome) {
            if(out.recurrent) {
                sum += out.amountPaid+1;
            }
        }

        return sum;
    }

    public get refundA():number {
        return 0;
    }

    public get refundS():number {
        return 0;
    }

    public get foodTicket():number {
        return 0;
    }

    public get saving():number {
        return 0;
    }

    public setIncome(incs:Income[]) {
        this._income = incs;

        let sum:number = 0;

        for(let inc of this._income) {
            if(inc) {
                sum += inc.amountRecieved;
            }
        }

        this.income = sum;
    }

    public setOutcome(outcs:Outcome[]) {
        this._outcome = outcs;

        let sum:number = 0;

        for(let out of this._outcome) {
            if(!out.recurrent) {
                sum += out.amountPaid;
            }
        }

        this.outcome = sum;
    }
}
