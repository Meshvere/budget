import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'food-ticket',
    templateUrl: './food-ticket.component.html',
    styleUrls: ['./food-ticket.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodTicketComponent implements OnInit {

    constructor(
        private _cd:ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
    }

}
