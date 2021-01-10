import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientModalComponent } from './recipient-modal.component';

describe('RecipientModalComponent', () => {
  let component: RecipientModalComponent;
  let fixture: ComponentFixture<RecipientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
