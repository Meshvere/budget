import { Component, ChangeDetectionStrategy } from '@angular/core';
import {UtilsService} from './shared/services/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'Budget';

    constructor(private _utilsService:UtilsService) {

    }
}
