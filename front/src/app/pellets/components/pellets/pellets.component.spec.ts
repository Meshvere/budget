import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelletsComponent } from './pellets.component';

describe('PelletsComponent', () => {
  let component: PelletsComponent;
  let fixture: ComponentFixture<PelletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
