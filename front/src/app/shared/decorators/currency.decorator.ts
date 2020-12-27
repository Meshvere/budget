import {UtilsService} from '../services/utils.service';

export function Currency() {
    return function(target) {
        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        target.prototype.currencyToString = function(amount:number):string {
            return UtilsService.currencyToString(amount);
        }

        console.log('Our decorated class currency :', target);
    }
}

export interface CurrencyI {
    currencyToString(amount:number):string;
}
