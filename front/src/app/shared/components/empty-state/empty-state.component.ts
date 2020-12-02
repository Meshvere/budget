import {ChangeDetectorRef,Component,Input} from '@angular/core';
import {IconService} from 'src/app/ui/services/icon.service';
import {ToastService} from 'src/app/ui/services/toast.service';
import {AbstractComponent} from '../../models/abstract-component';
import {UtilsService} from '../../services/utils.service';

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
        protected _toastService:ToastService,
        public iconService:IconService,
        protected _utilsService:UtilsService,
    ) {
        super(_cd, _toastService, _utilsService)
    }

    ngOnInit(): void {
    }

}
