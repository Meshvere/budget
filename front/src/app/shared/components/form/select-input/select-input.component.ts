import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractInputComponent} from '../../../models/abstract-input-component.component';
import {SelectModel} from '../../../models/select-model';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent extends AbstractInputComponent {
    @Input() public values:SelectModel[] = [];
    @Input() public labelType:string = 'raw';

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }

    public formatLabel(value:any):any {
        if(this.labelType == 'raw') {
            return value;
        } else if(['date', 'month'].indexOf(this.labelType) >= 0) {
            return UtilsService.dateToString(value, this.labelType != 'month');
        } else if(this.labelType == 'money') {
            return UtilsService.currencyToString(value);
        } else {
            return value;
        }
    }
}
