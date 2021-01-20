import {ChangeDetectionStrategy, Component, ChangeDetectorRef, Input} from '@angular/core';
import {AbstractComponent} from '../../models/abstract-component';
import {IconService} from '../../../shared/services/icon.service';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnComponent extends AbstractComponent {
    @Input() public label:string;
    @Input() public icon:string;
    @Input() public fnct:Function;
    @Input() public disabled:boolean = false;

    @Input() public primary:boolean = false;

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }

    public doAction() {
        if(this.fnct != undefined) {
            this.fnct();
        }
    }

    public getIcon(iconName:string):IconDefinition {
        let icon:IconDefinition = IconService.getIcon(iconName);

        return icon;
    }
}
