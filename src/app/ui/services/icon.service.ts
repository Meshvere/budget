import {Injectable} from '@angular/core';
import {faCheckCircle,faCircle,faCircleNotch,faEdit,faExclamationTriangle,faTimesCircle,faTrash,IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Injectable({
   providedIn: 'root'
})
export class IconService {
   public checkCircle:IconDefinition = faCheckCircle;
   public circle:IconDefinition = faCircle;
   public edit:IconDefinition = faEdit;
   public remove:IconDefinition = faTrash;
   public success:IconDefinition = faCheckCircle;
   public warning:IconDefinition = faExclamationTriangle;
   public error:IconDefinition = faTimesCircle;
   public loading:IconDefinition = faCircleNotch;

   constructor() {
   }
}
