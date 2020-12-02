import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {AbstractInputComponent} from '../../../../shared/models/abstract-input-component.component';
import {ToastService} from '../../../../ui/services/toast.service';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanInputComponent extends AbstractInputComponent {
    @Output() public valueChange:EventEmitter<boolean> = new EventEmitter();
    @Input() public labelTrue:string = 'Oui';
    @Input() public labelFalse:string = 'Non';

    public get switchValue():boolean {
        return this.value === 'true' || this.value === true || this.value === 1;
    }

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);
    }

    public switchState($event:Event) {
        this.value = $event.target['value'] === 'true' || $event.target['value'] === true || this.value === 1;

        this.valueChange.emit(this.value);
    }
}
