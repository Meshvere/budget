export class TableAction {
    public label:string;
    public icon:string;
    public action:TableActionRouteTo;

    constructor(init?:Partial<TableAction>) {
        Object.assign(this, init);
    }
}

export class TableActionRouteTo {
    public route:TableActionRouteToElem[] = [];

    constructor(init?:Partial<TableActionRouteTo>) {
        if(init.route != undefined) {
            for(let curElem of init.route) {
                this.route.push(new TableActionRouteToElem(curElem));
            }
        }
    }

    public getRoute(row:any):string[] {
        let curRoute:string[] = [];

        for(let curElem of this.route) {
            if(curElem.type == 'raw') {
                curRoute.push(curElem.value);
            } else if(curElem.type == 'field') {
                curRoute.push(row[curElem.value]);
            }
        }

        return curRoute;
    }
}

export class TableActionRouteToElem {
    public type:string = 'raw';
    public value:string;

    constructor(init?:Partial<TableActionRouteToElem>) {
        Object.assign(this, init);
    }
}
