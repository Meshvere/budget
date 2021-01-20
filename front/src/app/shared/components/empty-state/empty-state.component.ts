import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractComponent} from '../../models/components/abstract-component';

@Component({
    selector: 'empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent extends AbstractComponent {
    @Input() public title:string;
    @Input() public subTitle:string;
    @Input() public icon:string;

    constructor(
        protected _cd:ChangeDetectorRef,
    ) {
        super(_cd)
    }

    ngOnInit(): void {
    }

}
