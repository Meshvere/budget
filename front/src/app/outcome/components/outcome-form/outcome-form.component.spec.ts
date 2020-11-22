import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OutcomeFormComponent } from './outcome-form.component';

describe('OutcomeFormComponent', () => {
    let component: OutcomeFormComponent;
    let fixture: ComponentFixture<OutcomeFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ OutcomeFormComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OutcomeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
