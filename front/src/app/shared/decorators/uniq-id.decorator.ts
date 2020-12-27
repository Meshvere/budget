import {UtilsService} from '../services/utils.service';

export function UniqId() {
    return function(target) {
        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            c.prototype.uniqId = '';

            let obj = new c();
            obj.uniqId = Math.round(Math.random()*Math.random()*1000000*Date.now()).toString();

            return obj;
        }
    }
}
