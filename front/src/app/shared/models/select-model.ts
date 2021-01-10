export class SelectModel {
    public value:any;
    public label:string;
    public group:string;

    constructor(init?:Partial<SelectModel>) {
        Object.assign(this, init);
    }
}

export class GroupSelectModel {
    public values:SelectModel[] = [];
    public code:string;

    constructor(init?:Partial<GroupSelectModel>) {
        Object.assign(this, init);
    }
}

export class GroupSelectLabelsModel {
    public code:string;
    public label:string;

    constructor(init?:Partial<GroupSelectLabelsModel>) {
        Object.assign(this, init);
    }
}
