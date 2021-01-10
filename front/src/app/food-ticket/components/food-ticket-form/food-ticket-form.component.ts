import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'food-ticket-form',
    templateUrl: './food-ticket-form.component.html',
    styleUrls: ['./food-ticket-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTicketFormComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
