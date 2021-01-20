import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input} from '@angular/core';
import {AbstractInputComponent} from '../../../models/components/abstract-input-component.component';
import {Validators} from '@angular/forms';

@Component({
    selector: 'number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent extends AbstractInputComponent {
    @Input() public min:number;
    @Input() public max: number;
    @Input() public step:number = 1;

    protected _value: number;

    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        super.value = value;
    }

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);

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
