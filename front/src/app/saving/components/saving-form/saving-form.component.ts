import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'saving-form',
    templateUrl: './saving-form.component.html',
    styleUrls: ['./saving-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingFormComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
