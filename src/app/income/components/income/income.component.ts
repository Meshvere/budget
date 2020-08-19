import {ChangeDetectorRef,Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {Income} from 'src/app/shared/models/income';
import {DataService} from 'src/app/shared/services/data.service';
import {IconService} from 'src/app/ui/services/icon.service';
import {ToastService} from 'src/app/ui/services/toast.service';

@Component({
    selector: 'income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeComponent extends ComponentInit {
  public income:Income[] = [];

    constructor(
      protected _cd:ChangeDetectorRef,
      protected _toastService:ToastService,
      private _dataService:DataService,
      public icon:IconService,
    ) {
      super(_cd, _toastService);
    }

    ngOnInit(): void {
      super.ngOnInit();

      this.addSub = this._dataService.income$.subscribe(rec => {
        this.income = rec;

        this._cd.markForCheck();
      });
    }
}
