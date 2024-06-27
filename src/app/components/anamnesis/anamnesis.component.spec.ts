import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesisComponent } from './anamnesis.component';

describe('AnamnesisComponent', () => {
  let component: AnamnesisComponent;
  let fixture: ComponentFixture<AnamnesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnamnesisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnamnesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
