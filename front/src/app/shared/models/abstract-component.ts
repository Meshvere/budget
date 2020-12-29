import {ChangeDetectorRef, Directive, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AutoUnsub} from '../decorators/auto-unsub.decorator';
import {UtilsService} from '../services/utils.service';

@AutoUnsub()
@Directive()
export class AbstractComponent implements OnInit, OnDestroy {
    protected _subs:Subscription[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
    }

    public ngOnInit() {}

    public ngOnDestroy() {
        for(let sub of this._subs) {
          sub.unsubscribe();
        }
    }

    public set addSub(sub:Subscription) {
        this._subs.push(sub);
    }

    public currencyToString = function(amount:number):string {
        return UtilsService.currencyToString(amount);
    }

    public monthToString = function(date:Date):string {
        return UtilsService.dateToString(date, false);
    }

    public dateToString = function(date:Date, fullDate:boolean = true):string {
        return UtilsService.dateToString(date, fullDate);
    }
}
