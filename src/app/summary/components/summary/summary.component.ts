import {ChangeDetectorRef,Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {DataService} from 'src/app/shared/services/data.service';
import {ToastService} from 'src/app/ui/services/toast.service';


@Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
   styleUrls: ['./summary.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SummaryComponent extends AbstractComponent {
      public monthList:number[] = [];

      constructor(
         protected _cd:ChangeDetectorRef,
         protected _toastService:ToastService,
         private _dataService:DataService
      ) {
         super(_cd, _toastService);
      }

      ngOnInit(): void {
         super.ngOnInit();

         this.addSub = this._dataService.monthList$.subscribe(ml => {
            this.monthList = ml;

            this._cd.markForCheck();
         });
      }

      public calcMonthDate(i:number):Date {
         let curDate:Date = new Date();
         curDate.setMonth(curDate.getMonth() + i);

         return curDate;
      }
}
