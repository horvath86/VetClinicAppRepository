import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianTableComponent } from './veterinarian-table.component';

describe('VeterinarianTableComponent', () => {
  let component: VeterinarianTableComponent;
  let fixture: ComponentFixture<VeterinarianTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarianTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinarianTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
