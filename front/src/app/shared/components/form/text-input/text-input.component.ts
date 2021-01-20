import {ChangeDetectionStrategy,ChangeDetectorRef,Component,Input} from '@angular/core';
import {AbstractInputComponent} from '../../../models/components/abstract-input-component.component';

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
    ) {
        super(_cd);
    }

}
