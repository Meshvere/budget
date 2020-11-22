import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OutcomeComponent } from './outcome.component';

describe('OutcomeComponent', () => {
    let component: OutcomeComponent;
    let fixture: ComponentFixture<OutcomeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ OutcomeComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OutcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
