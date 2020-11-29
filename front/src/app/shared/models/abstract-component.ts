import { OnInit, OnDestroy, ChangeDetectorRef, Directive } from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastService} from 'src/app/ui/services/toast.service';

@Directive()
export class AbstractComponent implements OnInit, OnDestroy {
    protected _subs:Subscription[] = [];
    protected _uniqId:string;

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
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
}
