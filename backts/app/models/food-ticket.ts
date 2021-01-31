import {AbstractDatedEntity} from './abstract-dated-entity';
import {AbstractEntity} from './abstract-entity';

export class FoodTicket extends AbstractDatedEntity {
    public comment:string = '';
    public amount:number = 0;
    public shop_id:number = 0;

    constructor(init?:Partial<FoodTicket>) {
        super(init);

        Object.assign(this, init);

        this.removeNull();

        this._table = 'food_ticket';
    }
}

export class FoodTicketStats extends AbstractEntity {
    public month:string = '';
    public amount:number = 0;

    constructor(init?:Partial<FoodTicketStats>) {
        super(init);

        Object.assign(this, init);

        this.removeNull();
    }
}
