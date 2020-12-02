import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input} from '@angular/core';
import {AbstractInputComponent} from 'src/app/shared/models/abstract-input-component.component';
import {ToastService} from 'src/app/ui/services/toast.service';
import {Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';

@Component({
    selector: 'number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberInputComponent extends AbstractInputComponent {

    @Input() public min:number;
    @Input() public max: number;
    @Input() public step:number = 1;

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);

        this._changeWatch.push('min', 'max');
    }

    protected _updateValidatorList() {
        super._updateValidatorList();

        if(this.min != undefined) {
            this._validators.push(Validators.min(this.min));
        }

        if(this.max != undefined) {
            this._validators.push(Validators.max(this.max));
        }
    }
}
