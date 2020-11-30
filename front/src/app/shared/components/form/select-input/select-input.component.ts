import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input, Inject, LOCALE_ID} from '@angular/core';
import {AbstractInputComponent} from '../../../models/abstract-input-component.component';
import {SelectModel} from '../../../models/select-model';
import {ToastService} from '../../../../ui/services/toast.service';
import {DatePipe, CurrencyPipe} from '@angular/common';

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
        @Inject(LOCALE_ID) public locale: string,
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd, _toastService);
    }

    public formatLabel(value:any):any {
        if(this.labelType == 'raw') {
            return value;
        } else if(['date', 'month'].indexOf(this.labelType) >= 0) {
            let pipe:DatePipe = new DatePipe(this.locale);
            let format:string = 'dd/MM/yyyy';

            if(this.labelType == 'month') {
                format = 'MMM-y';
            }

            return pipe.transform(value, format);
        } else if(this.labelType == 'money') {
            let pipe:CurrencyPipe = new CurrencyPipe(this.locale, '€');

            return pipe.transform(value, 'EUR', 'symbol', '.2-2', this.locale);
        }
    }
}
