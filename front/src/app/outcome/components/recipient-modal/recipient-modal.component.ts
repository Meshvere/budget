import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractModalComponent} from '../../../shared/models/abstract-modal-component';
import {Recipient} from '../../../shared/models/recipient';
import {DataService} from '../../../shared/services/data.service';

@Component({
  selector: 'recipient-modal',
  templateUrl: './recipient-modal.component.html',
  styleUrls: ['./recipient-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipientModalComponent extends AbstractModalComponent implements OnInit {
    public recipient:Recipient = new Recipient();
    public isSaving:boolean = false;

    constructor(
        protected _cd:ChangeDetectorRef,
        private _dataService:DataService,
        protected _activeModal: NgbActiveModal,
    ) {
        super(_cd, _activeModal);
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    public saveRecipient() {
        if(!this.isSaving) {
            this.isSaving = true;
            this._cd.markForCheck();

            delete this.recipient.date;

            this.addSub = this._dataService.saveRecipient(this.recipient).subscribe(result => {
                this.isSaving = false;

                this._cd.markForCheck();

                this._activeModal.close(this.recipient);
            });
        }
    }

    public valueChange(value:any, prop:string) {
        this.recipient[prop] = value;

        this._cd.markForCheck();
    }
}
