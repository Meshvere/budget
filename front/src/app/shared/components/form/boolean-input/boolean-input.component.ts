import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {AbstractInputComponent} from 'src/app/shared/models/abstract-input-component.component';
import {ToastService} from 'src/app/ui/services/toast.service';

@Component({
  selector: 'boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanInputComponent extends AbstractInputComponent {
    @Input() public value:string;
    @Output() public valueChange:EventEmitter<boolean> = new EventEmitter();
    @Input() public labelTrue:string = 'Oui';
    @Input() public labelFalse:string = 'Non';

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd, _toastService);
    }

    public valueChanged($event) {
        this.valueChange.emit($event.target.value === 'true');

        this._cd.markForCheck();
    }
}
