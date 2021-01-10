import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'saving',
    templateUrl: './saving.component.html',
    styleUrls: ['./saving.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
