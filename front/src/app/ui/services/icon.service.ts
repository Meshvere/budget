import {Injectable} from '@angular/core';
import {faCalendar, faChartLine, faCheck, faCheckCircle, faCircle, faCircleNotch, faClock, faCoins, faCut, faEdit, faEuroSign, faExclamationTriangle, faFileImport, faMoneyBill, faMoneyCheck, faPiggyBank, faPlus, faQuestion, faShoppingCart, faTimesCircle, faTrash, faUtensils, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Injectable({
   providedIn: 'root'
})
export class IconService {
    public check:IconDefinition = faCheck;
    public checkCircle:IconDefinition = faCheckCircle;
    public circle:IconDefinition = faCircle;
    public add:IconDefinition = faPlus;
    public edit:IconDefinition = faEdit;
    public remove:IconDefinition = faTrash;
    public success:IconDefinition = faCheckCircle;
    public warning:IconDefinition = faExclamationTriangle;
    public error:IconDefinition = faTimesCircle;
    public loading:IconDefinition = faCircleNotch;
    public euro:IconDefinition = faEuroSign;
    public calendar:IconDefinition = faCalendar;
    public bank:IconDefinition = faMoneyCheck;
    public cut:IconDefinition = faCut;
    public clock:IconDefinition = faClock;
    public question:IconDefinition = faQuestion;
    public chartLine:IconDefinition = faChartLine;
    public moneyCheck:IconDefinition = faMoneyCheck;
    public coins:IconDefinition = faCoins;
    public moneyBill:IconDefinition = faMoneyBill;
    public utensils:IconDefinition = faUtensils;
    public shoppingCart:IconDefinition = faShoppingCart;
    public piggyBank:IconDefinition = faPiggyBank;
    public fileImport:IconDefinition = faFileImport;

    constructor() {
    }
}
