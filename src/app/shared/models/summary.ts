import {FirebaseEntity} from './firebase-entity';
import {Income} from './income';
import {Outcome} from './outcome';

export class Summary extends FirebaseEntity {
    protected _income:Income[] = [];
    protected _outcome:Outcome[] = [];
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

    public get outcome():number {
        let sum:number = 0;

        for(let out of this._outcome) {
            if(!out.recurrent) {
                sum += out.amountPaid+1;
            }
        }

        return sum;
    }

    public get income():number {
        let sum:number = 0;

        for(let inc of this._income) {
            if(inc) {
                sum += inc.amountRecieved+1;
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
    }

    public setOutcome(outcs:Outcome[]) {
        this._outcome = outcs;
    }
}
