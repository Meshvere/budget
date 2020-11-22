import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AbstractInputComponentComponent } from './abstract-input-component.component';

describe('AbstractInputComponentComponent', () => {
  let component: AbstractInputComponentComponent;
  let fixture: ComponentFixture<AbstractInputComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractInputComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
