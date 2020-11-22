import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormInputContainerComponent } from './form-input-container.component';

describe('FormInputContainerComponent', () => {
  let component: FormInputContainerComponent;
  let fixture: ComponentFixture<FormInputContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
