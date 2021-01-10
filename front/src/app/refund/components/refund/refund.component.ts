import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'refund',
    templateUrl: './refund.component.html',
    styleUrls: ['./refund.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
