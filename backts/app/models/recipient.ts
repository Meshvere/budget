import {AbstractEntity} from './abstract-entity';

export class Recipient extends AbstractEntity {
    public label:string = '';
    public main:boolean = false;

    constructor(init?:Partial<Recipient>) {
        super(init);

        this._table = 'recipient';

        if(init != undefined) {
            Object.assign(this, init);
        }

        this.removeNull();
    }
}
