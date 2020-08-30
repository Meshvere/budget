import {ChangeDetectorRef,Component} from '@angular/core';
import {ComponentInit} from '../../../shared/models/component-init';
import {ToastService} from '../../../ui/services/toast.service';

@Component({
    selector: 'app-outcome',
    templateUrl: './outcome.component.html',
    styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent extends ComponentInit {

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
) {
    super(_cd, _toastService)
}

    ngOnInit(): void {
    }

}
