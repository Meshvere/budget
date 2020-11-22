import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodTicketComponent } from './food-ticket.component';

describe('FoodTicketComponent', () => {
    let component: FoodTicketComponent;
    let fixture: ComponentFixture<FoodTicketComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ FoodTicketComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodTicketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
