export class EntityProperty {
    public name:string;
    public type:string;

    constructor(init?:Partial<EntityProperty>) {
        Object.assign(this, init);
    }
}
