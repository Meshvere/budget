export function AutoUnsub(obs$ = []) {
    return function(constructor: any) {
        const orig = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function() {
            if(this) {
                for(const prop in this) {
                    const property = this[prop];
                    if(property != undefined && typeof property.unsubscribe === "function" && !obs$.includes(property)) {
                        console.log(prop)
                        obs$.push(property)
                    }
                }
                obs$.forEach(ob => ob.unsubscribe());

                console.log(orig.apply)
                // orig.apply();
            }
        };
    }
}
