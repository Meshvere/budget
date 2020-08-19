import {ChangeDetectorRef,Component,Input} from '@angular/core';
import {IconService} from 'src/app/ui/services/icon.service';
import {ToastService} from 'src/app/ui/services/toast.service';
import {ComponentInit} from '../../models/component-init';

@Component({
  selector: 'empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent extends ComponentInit {
  @Input() public title:string;
  @Input() public subTitle:string;
  @Input() public icon:string;

  constructor(
    protected _cd:ChangeDetectorRef,
    protected _toastService:ToastService,
    public iconService:IconService,
  ) {
    super(_cd, _toastService)
  }

  ngOnInit(): void {
  }

}
