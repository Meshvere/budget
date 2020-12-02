import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input} from '@angular/core';
import {AbstractInputComponent} from 'src/app/shared/models/abstract-input-component.component';
import {ToastService} from 'src/app/ui/services/toast.service';
import {UtilsService} from '../../../services/utils.service';

@Component({
    selector: 'text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent extends AbstractInputComponent {
    @Input() public maxLength:number;
    @Input() public textarea:boolean = false;
    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService);
    }

}
