import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakePlantComponent } from './fake-plant.component';

describe('FakePlantComponent', () => {
  let component: FakePlantComponent;
  let fixture: ComponentFixture<FakePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakePlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FakePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
