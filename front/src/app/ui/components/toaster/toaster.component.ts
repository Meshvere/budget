import {ChangeDetectorRef, Component} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {Toast} from '../../models/toast';
import {ToastService} from '../../services/toast.service';

@Component({
   selector: 'app-toaster',
   templateUrl: './toaster.component.html',
   styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent extends AbstractComponent {
    public toastList:Toast[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.addSub = this._toastService.toastList$.subscribe(toastL => {
            this.toastList = toastL;

            this._cd.markForCheck();
        });
    }

}
