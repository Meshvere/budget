import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input} from '@angular/core';
import {AbstractInputComponent} from '../../../models/abstract-input-component.component';
import {SelectModel} from '../../../models/select-model';
import {ToastService} from '../../../../ui/services/toast.service';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent extends AbstractInputComponent {
    @Input() public values:SelectModel[] = [];

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd, _toastService);
    }

}
