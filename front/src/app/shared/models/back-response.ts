export class BackResponse {
    public affectedRows:number;
    ​public changedRows:number;
    ​public fieldCount:number;
    public ​insertId:number;
    public ​message:string;
    ​public protocol41:boolean;
    ​public serverStatus:number;
    ​public warningCount:number;

    constructor(init?:Partial<BackResponse>) {
        Object.assign(this, init);
    }
}
