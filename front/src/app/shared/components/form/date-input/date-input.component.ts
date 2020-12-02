import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input} from '@angular/core';
import {AbstractInputComponent} from 'src/app/shared/models/abstract-input-component.component';
import {ToastService} from 'src/app/ui/services/toast.service';
import {TimeService} from 'src/app/shared/services/time.service';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent extends AbstractInputComponent {
    @Input() public min:number;
    @Input() public max:number;
    protected _date:string;

    public get value(): Date|string {
        return this._value;
    }
    public set value(value: Date|string) {
        if(typeof value == 'string') {
            this._value = new Date(value);
        } else {
            this._value = value;
        }

        this._date = TimeService.yyyyMmDd(this._value);

        this._validationChange();
    }

    public get date():string {
        return this._date;
    }

    public set date(date:string) {
        this._date = date;

        this._value = new Date(date);
    }

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);
    }
}
