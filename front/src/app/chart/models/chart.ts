export class Chart {
    public static readonly CHART_BAR:string = 'bar';
    public static readonly CHART_WATERFALL:string = 'waterfall';

    public x:any[] = [];
    public y:any[] = [];
    public type:string = Chart.CHART_BAR;

    constructor(init?:Partial<Chart>) {
        Object.assign(this, init);
    }
}
