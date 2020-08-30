import {ChangeDetectorRef,Component} from '@angular/core';
import {ComponentInit} from '../../../shared/models/component-init';
import {ToastService} from '../../../ui/services/toast.service';

@Component({
    selector: 'app-outcome-form',
    templateUrl: './outcome-form.component.html',
    styleUrls: ['./outcome-form.component.scss']
})
export class OutcomeFormComponent extends ComponentInit {

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
) {
    super(_cd, _toastService)
}

    ngOnInit(): void {
    }

}
