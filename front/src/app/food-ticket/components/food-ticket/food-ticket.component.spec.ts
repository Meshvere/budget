import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTicketComponent } from './food-ticket.component';

describe('FoodTicketComponent', () => {
    let component: FoodTicketComponent;
    let fixture: ComponentFixture<FoodTicketComponent>;

    beforeEach(async(() => {
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
