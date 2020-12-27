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

        console.log('Our decorated class date :', target);
    }
}

// export interface DateI {
//     monthToString(date:Date):string;
//     dateToString(date:Date, fullDate:boolean):string;
// }


// export function DateDate(prefix?: string) {
//     return (target) => {
//       // save a reference to the original constructor
//       let original = target;

//       // a utility function to generate instances of a class
//       function construct(constructor, args) {
//         let c: any = function () {
//           return constructor.apply(this, args);
//         }
//         c.prototype = constructor.prototype;
//         return new c();
//       }

//       // the new constructor behavior
//       let f: any = function (...args) {
//         console.log(prefix + original.name);
//         return construct(original, args);
//       }

//       // copy prototype so instanceof operator still works
//       f.prototype = original.prototype;

//       // return new constructor (will override original)
//       return f;
//     };
//   }
