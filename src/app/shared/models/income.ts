import {Account} from '../enum/account.enum';


export class Income {
    public id:string;
    public date:Date;
    public timestamp:any;
    public account:Account = Account.MINE;
    public label:string;
    public amount:number;
    public shared:boolean = false;
    public commentaire:string; //TODO translate
    public waiting:boolean = false;

    private _roundFactor:number = 100;


    constructor(init?:Partial<Income>) {
        this.timestamp = init['date'];

        if(init['date'] != undefined && init['date'] != null) {
                let second:number = typeof init['date'] == 'number'?init['date']:init['date']['seconds'];

                this.date = new Date(second * 1000);
        } else {
                this.date = new Date();
        }
        delete init.date;

        if(init['account'] != undefined) {
            init.account = init['account'] == Account.MINE?Account.MINE:Account.COMMON;
        }

        Object.assign(this, init);

        if(init['amount'] != undefined) {
            this.amount = Math.round(this.amount * this._roundFactor) / this._roundFactor;
        }
    }

    public get amountRecieved():number {
        return this.shared?(this.amount/2):this.amount;
    }

    public get dateInput():string {
        return [this.date.getFullYear(), (this.date.getMonth()+1).toString().padStart(2, '0'), (this.date.getDate()).toString().padStart(2, '0')].join('-');
    }

    public set dateInput(dat:string) {
        this.date = new Date(dat);
    }

    public toObject():any {
        let obj:any = JSON.parse(JSON.stringify(this));

        if(this.date != undefined && this.date != null) {
            obj.date = Math.round(this.date.getTime() / 1000);
        }

        return obj;
    }
}
