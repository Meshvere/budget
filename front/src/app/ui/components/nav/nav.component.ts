import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavEntry} from '../../models/nav-entry';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {DataService} from 'src/app/shared/services/data.service';

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
        public route: ActivatedRoute,
        private _dataService:DataService,
    ) {
        super(_cd);

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
