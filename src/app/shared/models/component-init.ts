import {OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastService} from 'src/app/ui/services/toast.service';

export class ComponentInit implements OnInit, OnDestroy {
    protected _subs:Subscription[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {

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
