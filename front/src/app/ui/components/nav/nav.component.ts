import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {DataService} from 'src/app/shared/services/data.service';
import {NavEntry} from '../../models/nav-entry';
import {IconService} from '../../services/icon.service';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

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
