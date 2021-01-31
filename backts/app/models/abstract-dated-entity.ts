import {AbstractEntity} from './abstract-entity';

export class AbstractDatedEntity extends AbstractEntity {
    public date:Date;

    constructor(init?:Partial<AbstractDatedEntity>) {
        super(init);

        if(init != undefined && init.date != undefined) {
            this.date = new Date(init.date);
        }
    }
}
