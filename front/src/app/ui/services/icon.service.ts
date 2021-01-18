import {Injectable} from '@angular/core';
import {faBullseye, faCalendar, faChartLine, faCheck, faCheckCircle, faCircle, faCircleNotch, faClock, faCoins, faCut, faEdit, faEuroSign, faExclamationTriangle, faFileImport, faHourglass, faMoneyBill, faMoneyCheck, faPiggyBank, faPlus, faQuestion, faSave, faShoppingCart, faSort, faSortDown, faSortUp, faSync, faTimesCircle, faTrash, faUserPlus, faUtensils, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Injectable({
   providedIn: 'root'
})
export class IconService {
    public static check:IconDefinition = faCheck;
    public static checkCircle:IconDefinition = faCheckCircle;
    public static circle:IconDefinition = faCircle;
    public static save:IconDefinition = faSave;
    public static add:IconDefinition = faPlus;
    public static edit:IconDefinition = faEdit;
    public static remove:IconDefinition = faTrash;
    public static success:IconDefinition = faCheckCircle;
    public static warning:IconDefinition = faExclamationTriangle;
    public static error:IconDefinition = faTimesCircle;
    public static loading:IconDefinition = faCircleNotch;
    public static euro:IconDefinition = faEuroSign;
    public static calendar:IconDefinition = faCalendar;
    public static bank:IconDefinition = faMoneyCheck;
    public static cut:IconDefinition = faCut;
    public static clock:IconDefinition = faClock;
    public static question:IconDefinition = faQuestion;
    public static chartLine:IconDefinition = faChartLine;
    public static moneyCheck:IconDefinition = faMoneyCheck;
    public static coins:IconDefinition = faCoins;
    public static moneyBill:IconDefinition = faMoneyBill;
    public static utensils:IconDefinition = faUtensils;
    public static shoppingCart:IconDefinition = faShoppingCart;
    public static piggyBank:IconDefinition = faPiggyBank;
    public static fileImport:IconDefinition = faFileImport;
    public static userPlus:IconDefinition = faUserPlus;
    public static hourglass:IconDefinition = faHourglass;
    public static sort:IconDefinition = faSort;
    public static sortUp:IconDefinition = faSortUp;
    public static sortDown:IconDefinition = faSortDown;
    public static sync:IconDefinition = faSync;
    public static bullseye:IconDefinition = faBullseye;

    constructor() {}

    public static getIcon(iconName:string):IconDefinition {
        let icon:IconDefinition;

        if(iconName != undefined) {
            icon = IconService[iconName];
        }

        return icon;
    }
}
