import {AbstractEntity} from './abstract-entity';

export class Shop extends AbstractEntity {
    public label:string = '';
    public main:boolean = false;
    public category:string = '';

    constructor(init?:Partial<Shop>) {
        super(init);

        init = this._castDatas(init);

        Object.assign(this, init);

        this.removeNull();
    }
}
