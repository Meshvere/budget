import {ChangeDetectionStrategy,ChangeDetectorRef,Component} from '@angular/core';
import {AbstractComponent} from 'src/app/shared/models/abstract-component';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent extends AbstractComponent {

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd, _toastService);
    }
}
