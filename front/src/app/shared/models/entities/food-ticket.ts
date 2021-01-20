import {TimeService} from '../../services/time.service';
import {AbstractEntity} from './abstract-entity';

export class FoodTicket extends AbstractEntity {
    public comment:string = '';
    public amount:number = 0;
    public date:Date = new Date(TimeService.undefinedDate);
    public shop_id:number = 0;

    constructor(init?:Partial<FoodTicket>) {
        super(init);

        init = this._castDatas(init);

        Object.assign(this, init);

        this.removeNull();
    }
}

export class FoodTicketStats extends AbstractEntity {
    public month:string = '';
    public amount:number = 0;

    constructor(init?:Partial<FoodTicketStats>) {
        super(init);

        init = this._castDatas(init);

        Object.assign(this, init);

        this.removeNull();
    }
}
