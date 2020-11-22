export class SelectModel {
    public value:any;
    public label:string;
    constructor(init?:Partial<SelectModel>) {
        Object.assign(this, init);
    }
}
