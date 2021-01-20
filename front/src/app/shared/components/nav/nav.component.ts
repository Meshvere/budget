import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractComponent} from '../../models/abstract-component';
import {NavEntry} from '../../models/nav-entry';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
}
