import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {Toast} from '../../models/toast';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {ToastService} from '../../services/toast.service';
import {IconService} from '../../services/icon.service';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

@Component({
   selector: 'app-toast',
   templateUrl: './toast.component.html',
   styleUrls: ['./toast.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent extends ComponentInit {
   @Input() public id:number;
   @Input() public title:string;
   @Input() public message:string;
   @Input() public type:string = Toast.NORMAL;
   @Input() public autoClose:boolean = false;
   @Input() public autoCloseDelay:number;

   constructor(
      protected _cd:ChangeDetectorRef,
      protected _toastService:ToastService,
      private _iconService:IconService,
   ) {
      super(_cd, _toastService);
   }

   ngOnInit(): void {
      super.ngOnInit();

      if(this.autoClose && this.autoCloseDelay != undefined) {
         setTimeout(()=>{                                        //<<<---using ()=> syntax
            this.close();
    }, this.autoCloseDelay * 1000);
      }
   }

   public getIcon():IconDefinition {
      let icon:IconDefinition;

      if(this.type == Toast.SUCCESS) {
         icon = this._iconService.success;
      } else if(this.type == Toast.WARNING) {
         icon = this._iconService.warning;
      } else if(this.type == Toast.ERROR) {
         icon = this._iconService.error;
      } else if(this.type == Toast.LOADING) {
         icon = this._iconService.loading;
      }

      return icon;
   }

   public get loading():boolean {
      return this.type == Toast.LOADING;
   }

   public close() {
      this._toastService.closeToast(this.id);
      this._cd.markForCheck();
   }
}
