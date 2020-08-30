import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {Toast} from '../../models/toast';
import {ToastService} from '../../services/toast.service';

@Component({
   selector: 'app-toaster',
   templateUrl: './toaster.component.html',
   styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent extends ComponentInit {
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

         this._cd.markForCheck();
      });
   }

}
