import {ChangeDetectorRef, Directive} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {AbstractFormComponent} from './abstract-form-component';
import {InputErrorModel} from './input-error-model';

@Directive()
export class AbstractModalComponent extends AbstractFormComponent {
    protected _subs:Subscription[] = [];

    public validations:{code:string, validation:InputErrorModel}[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _activeModal: NgbActiveModal,
    ) {
        super(_cd);
    }

    public dismiss() {
        this._activeModal.dismiss();
    }
}
