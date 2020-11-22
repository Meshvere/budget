import {Injectable} from '@angular/core';
import {faCalendar,faCheck,faCheckCircle,faCircle,faCircleNotch,faClock,faCut,faEdit,faEuroSign,faExclamationTriangle,faMoneyCheck,faPlus,faQuestion,faTimesCircle,faTrash,IconDefinition} from '@fortawesome/free-solid-svg-icons';

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

    constructor() {
    }
}
