import {ChangeDetectorRef,Component,Input} from '@angular/core';
import {IconService} from 'src/app/ui/services/icon.service';
import {AbstractComponent} from '../../models/abstract-component';

@Component({
    selector: 'empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent extends AbstractComponent {
    @Input() public title:string;
    @Input() public subTitle:string;
    @Input() public icon:string;

    constructor(
        protected _cd:ChangeDetectorRef,
        public iconService:IconService,
    ) {
        super(_cd)
    }

    ngOnInit(): void {
    }

}
