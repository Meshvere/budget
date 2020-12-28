export class NavEntry {
    public label: string;
    public icon: string;
    public path: string;

    constructor(init?:Partial<NavEntry>) {
        Object.assign(this, init);
    }
}
