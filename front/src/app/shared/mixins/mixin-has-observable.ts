import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Subscription} from 'rxjs/internal/Subscription';

export const MixinHasObservable = (base)    => {
    return class extends base implements OnDestroy {
        public destroyer$:Subject<any> = new Subject();

        protected _subs:Subscription[] = [];

        public set addSub(sub:Subscription) {
            this._subs.push(sub);
        }

        constructor(
            ...args: any[]
        ) {
            super(...args);
        }

        public ngOnDestroy() {
            this.destroyer$.next();

            this._subs.forEach(sub => sub.unsubscribe());
        }
    }
}

export interface MixinHasObservableI extends OnDestroy {
    destroyer$:Subject<void>;
}
