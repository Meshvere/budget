export class NavEntry {
    public label: string;
    public path: string;

    constructor(init?:Partial<NavEntry>) {
        Object.assign(this, init);
    }
}
