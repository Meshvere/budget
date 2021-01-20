import {ChangeDetectionStrategy,ChangeDetectorRef,Component} from '@angular/core';
import {AbstractComponent} from '../../../shared/models/abstract-component';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends AbstractComponent {

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }
}
