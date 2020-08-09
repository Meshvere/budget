import {OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';

export class ComponentInit implements OnInit, OnDestroy {
    protected _subs:Subscription[] = [];

    constructor(protected _cd:ChangeDetectorRef) {

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
