import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {Toast} from '../../models/toast';
import {ToastService} from '../../services/toast.service';
import {UtilsService} from '../../../shared/services/utils.service';

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
      protected _utilsService:UtilsService,
   ) {
      super(_cd, _toastService, _utilsService);
   }

   ngOnInit(): void {
      super.ngOnInit();

      this.addSub = this._toastService.toastList$.subscribe(toastL => {
         this.toastList = toastL;

         this._cd.markForCheck();
      });
   }

}
