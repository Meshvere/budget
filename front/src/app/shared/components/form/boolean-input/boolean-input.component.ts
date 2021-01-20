import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractInputComponent} from '../../../../shared/models/abstract-input-component.component';

@Component({
  selector: 'boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanInputComponent extends AbstractInputComponent {
    @Output() public valueChange:EventEmitter<boolean> = new EventEmitter();
    @Input() public labelTrue:string = 'Oui';
    @Input() public iconTrue:string;
    @Input() public labelFalse:string = 'Non';
    @Input() public iconFalse:string;

    public get switchValue():boolean {
        return this.value === 'true' || this.value === true || this.value === 1;
    }

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }

    public switchState($event:Event) {
        this.value = $event.target['value'] === 'true' || $event.target['value'] === true || this.value === 1;

        this.valueChange.emit(this.value);
    }
}
