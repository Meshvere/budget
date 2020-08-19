import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {Toast} from '../../models/toast';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent extends ComponentInit {
    public toastList:Toast[] = [];

    constructor(
      protected _cd:ChangeDetectorRef,
      protected _toastService:ToastService,
    ) {
      super(_cd, _toastService);
    }

    ngOnInit(): void {
      super.ngOnInit();

      this.addSub = this._toastService.toastList$.subscribe(toastL => {
        this.toastList = toastL;
      });
    }

}
