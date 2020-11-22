export class MonthSummary {
    public num: number;
    public depense: number;
    public recurrent: number;
    public income: number;
    public reste: number;
    public remboursableA: number;
    public remboursableS: number;
    public ticketResto: number;
    public epargne: number;

    constructor(init?:Partial<MonthSummary>) {
        Object.assign(this, init);
    }
}
