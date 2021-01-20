import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelletsFormComponent } from './pellets-form.component';

describe('PelletsFormComponent', () => {
  let component: PelletsFormComponent;
  let fixture: ComponentFixture<PelletsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelletsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelletsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
