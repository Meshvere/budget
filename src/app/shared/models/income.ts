import {Account} from '../enum/account.enum';


export class Income {
    public id:string;
    public date:Date;
    public account:Account = Account.MINE;
    public label:string;
    public amount:number;
    public shared:boolean = false;
    public commentaire:string;
    public waiting:boolean = false;

    private _roundFactor:number = 100;


    constructor(init?:Partial<Income>) {
      if(init['date'] != undefined) {
        this.date = new Date(init['date']['seconds']);
      } else {
        this.date = new Date();
      }
      if(init['account'] != undefined) {
        init.account = init['account'] == Account.MINE?Account.MINE:Account.COMMON;
      }
      delete init.date;

      Object.assign(this, init);

      if(init['amount'] != undefined) {
        this.amount = Math.round(this.amount * this._roundFactor) / this._roundFactor;
      }
    }

    public get montantPercu():number {
        return this.shared?(this.amount/2):this.amount;
    }

    public get dateInput():string {
        return [this.date.getFullYear(), (this.date.getMonth()+1).toString().padStart(2, '0'), (this.date.getDate()).toString().padStart(2, '0')].join('-');
    }

    public set dateInput(dat:string) {
        this.date = new Date(dat);
    }
}
