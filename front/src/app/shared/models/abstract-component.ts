import {ChangeDetectorRef, Directive, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastService} from 'src/app/ui/services/toast.service';
import {UtilsService} from '../services/utils.service';

@Directive()
export class AbstractComponent implements OnInit, OnDestroy {
    protected _subs:Subscription[] = [];
    protected _uniqId:string;

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        protected _utilsService:UtilsService,
    ) {
        this._uniqId = Math.round(Math.random()*Math.random()*1000000*Date.now()).toString();
    }

    public ngOnInit() {

    }

    public ngOnDestroy() {
        for(let sub of this._subs) {
          sub.unsubscribe();
        }
    }

    public set addSub(sub:Subscription) {
      this._subs.push(sub);
    }

    public monthToString(date:Date):string {
        return this._utilsService.dateToString(date, false);
    }

    public dateToString(date:Date):string {
        return this._utilsService.dateToString(date, true);
    }

    public currencyToDate(amount:number):string {
        return this._utilsService.currencyToString(amount);
    }
}
