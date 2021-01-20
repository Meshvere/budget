import {AbstractEntity} from './abstract-entity';

export class Recipient extends AbstractEntity {
    public label:string = '';
    public main:boolean = false;

    constructor(init?:Partial<Recipient>) {
        super(init);

        init = this._castDatas(init);
        Object.assign(this, init);

        this.removeNull();
    }
}
