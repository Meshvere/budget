import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractComponent} from '../../../shared/models/components/abstract-component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent extends AbstractComponent {
    @Input() public isEmpty:boolean = false;
    @Input() public emptyTitle:string;

    constructor(
      protected _cd:ChangeDetectorRef,
    ) {
        super(_cd);
    }

}
