import {UtilsService} from '../services/utils.service';

export function DateFnct() {
    return function(target) {
        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        target.prototype.monthToString = function(date:Date):string {
            return UtilsService.dateToString(date, false);
        }

        target.prototype.dateToString = function(date:Date, fullDate:boolean = true):string {
            return UtilsService.dateToString(date, fullDate);
        }
    }
}
