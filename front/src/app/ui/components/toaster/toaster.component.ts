import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {Toast} from '../../models/toast';
import {ToastService} from '../../services/toast.service';

@Component({
   selector: 'toaster',
   templateUrl: './toaster.component.html',
   styleUrls: ['./toaster.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent extends AbstractComponent {
    public toastList:Toast[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        private _toastService:ToastService,
    ) {
        super(_cd);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = ToastService.toastList$.subscribe(toastL => {
            this.toastList = toastL;

            this._cd.markForCheck();
        });
    }

}
