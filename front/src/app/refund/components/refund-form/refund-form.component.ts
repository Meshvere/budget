import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'refund-form',
    templateUrl: './refund-form.component.html',
    styleUrls: ['./refund-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundFormComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
