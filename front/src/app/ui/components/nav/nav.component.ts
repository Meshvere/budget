import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NavEntry} from '../../models/nav-entry';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {DataService} from 'src/app/shared/services/data.service';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent extends AbstractComponent {
    public entryList:NavEntry[] = [];
    public activeRoute:string;

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        public route: ActivatedRoute,
        private _router: Router,
        private _dataService:DataService,
    ) {
        super(_cd, _toastService);

        this.addSub = this._dataService.menuEntries$.subscribe(me => {
          this.entryList = me;

          this._cd.markForCheck();
        });
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.route.url.subscribe(rt => {
            // console.log(rt)
        })
    }
}
