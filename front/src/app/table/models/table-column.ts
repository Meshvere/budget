export class TableColumn {
    public label:string;
    public field:string;
    public cellType:any = 'raw';

    constructor(init?:Partial<TableColumn>) {
        Object.assign(this, init);
    }
}
