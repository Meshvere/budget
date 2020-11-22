import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncomeFormComponent } from './income-form.component';

describe('IncomeFormComponent', () => {
    let component: IncomeFormComponent;
    let fixture: ComponentFixture<IncomeFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ IncomeFormComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IncomeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
