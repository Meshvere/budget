import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {AbstractComponent} from '../../../shared/models/abstract-component';
import {Toast} from '../../models/toast';
import {IconService} from '../../services/icon.service';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent extends AbstractComponent {
    @Input() public id:number;
    @Input() public title:string;
    @Input() public message:string;
    @Input() public type:string = Toast.NORMAL;
    @Input() public autoClose:boolean = false;
    @Input() public autoCloseDelay:number;
    @Input() public shown:boolean = true;

    constructor(
        protected _cd:ChangeDetectorRef,
        protected _toastService:ToastService,
    ) {
        super(_cd);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if(this.autoClose && this.autoCloseDelay != undefined) {
            setTimeout(()=>{
                this.close();
            }, this.autoCloseDelay * 1000);
        }
    }

    public getIcon():IconDefinition {
        let icon:IconDefinition;

        if(this.type == Toast.SUCCESS) {
            icon = IconService.getIcon('success');
        } else if(this.type == Toast.WARNING) {
            icon = IconService.getIcon('warning');
        } else if(this.type == Toast.ERROR) {
            icon = IconService.getIcon('error');
        } else if(this.type == Toast.LOADING) {
            icon = IconService.getIcon('loading');
        }

      return icon;
    }

    public get loading():boolean {
        return this.type == Toast.LOADING;
    }

    public close() {
        this.shown = false;
        this._toastService.closeToast(this.id);

        this._cd.markForCheck();
    }
}
