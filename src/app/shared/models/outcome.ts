import {Account} from '../enum/account.enum';


export class Outcome {
    public id:string;
    public date:Date;
    public timestamp:any;
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

    private _roundFactor:number = 100;


    constructor(init?:Partial<Outcome>) {
        this.timestamp = init['date'];

        if(init['date'] != undefined && init['date'] != null) {
                let second:number = typeof init['date'] == 'number'?init['date']:init['date']['seconds'];

                this.date = new Date(second * 1000);
        } else {
                this.date = new Date();
        }
        delete init.date;

        if(init['start_on'] != undefined && init['start_on'] != null) {
            let second:number = typeof init['start_on'] == 'number'?init['start_on']:init['start_on']['seconds'];

            this.start_on = new Date(second * 1000);
        } else {
                this.start_on = new Date();
        }
        delete init.start_on;

        if(init['end_on'] != undefined && init['end_on'] != null) {
            let second:number = typeof init['end_on'] == 'number'?init['end_on']:init['end_on']['seconds'];

            this.end_on = new Date(second * 1000);
        } else {
                this.end_on = new Date();
        }
        delete init.end_on;

        if(init['account'] != undefined) {
            init.account = init['account'] == Account.MINE?Account.MINE:Account.COMMON;
        }

        Object.assign(this, init);

        if(init['amount'] != undefined) {
            this.amount = Math.round(this.amount * this._roundFactor) / this._roundFactor;
        }
    }

    public get amountPaid():number {
        return this.shared?(this.amount/2):this.amount;
    }

    public get refundAurelie():number {
        return this.shared && this.account == Account.MINE?(this.amount/2):0;
    }

    public get refundMe():number {
        return this.shared && this.account == Account.COMMON?(this.amount/2):0;
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

    public get active():boolean {
        return this.date.getTime() >= this.start_on.getTime() && this.date.getTime() <= this.end_on.getTime();
    }
}
