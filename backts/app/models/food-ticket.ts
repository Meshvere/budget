import {AbstractEntity} from './abstract-entity';

export class FoodTicket extends AbstractEntity {
    public comment:string = '';
    public amount:number = 0;
    public date:Date;

    constructor(init?:Partial<FoodTicket>) {
        super(init);

        Object.assign(this, init);

        this.removeNull();
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
