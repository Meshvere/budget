import {ChangeDetectionStrategy,ChangeDetectorRef,Component} from '@angular/core';
import {ComponentInit} from 'src/app/shared/models/component-init';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent extends ComponentInit {

    constructor(
      protected _cd:ChangeDetectorRef,
      protected _toastService:ToastService,
    ) {
      super(_cd, _toastService);
    }
}
