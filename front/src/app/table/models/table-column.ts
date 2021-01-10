import {SelectModel} from '../../shared/models/select-model';

export class TableColumn {
    public label:string;
    public field:string;
    public cellType:any = 'raw';
    public filter:boolean = false;
    public sortable:boolean = false;

    constructor(init?:Partial<TableColumn>) {
        Object.assign(this, init);
    }
}

export class TableColumnFilter extends TableColumn {
    public active:boolean = false;
    public filterValue:any = '';
    public values:TableFilterValue[] = [];

    constructor(init?:Partial<TableColumnFilter>) {
        super(init);

        Object.assign(this, init);

        if(this.cellType == 'boolean') {
            this.filterValue = true;
        }
    }
}

export class TableFilterValue extends SelectModel {
    public active:boolean = true;

    constructor(init?:Partial<TableFilterValue>) {
        super(init);

        Object.assign(this, init);
    }
}
