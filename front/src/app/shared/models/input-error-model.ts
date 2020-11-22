export class InputErrorModel {
    public valid:boolean;
    public errors:any;

    constructor(init?:Partial<InputErrorModel>) {
        Object.assign(this, init);
    }
}

export class InputErrorMessageModel {
    public code:string;
    public message:string;

    constructor(init?:Partial<InputErrorMessageModel>) {
        Object.assign(this, init);
    }
}
