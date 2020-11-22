import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodTicketFormComponent } from './food-ticket-form.component';

describe('FoodTicketFormComponent', () => {
    let component: FoodTicketFormComponent;
    let fixture: ComponentFixture<FoodTicketFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ FoodTicketFormComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoodTicketFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
