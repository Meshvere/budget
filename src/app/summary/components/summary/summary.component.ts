import {ChangeDetectorRef,Component} from '@angular/core';

import {DataService} from 'src/app/shared/services/data.service';
import {ComponentInit} from 'src/app/shared/models/component-init';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent extends ComponentInit {
    public monthList:number[] = [];

    constructor(
      protected _cd:ChangeDetectorRef,
      private _dataService:DataService
    ) {
      super(_cd);
    }

    ngOnInit(): void {
      super.ngOnInit();

      this.addSub = this._dataService.monthList$.subscribe(ml => {
        console.log(ml)
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
