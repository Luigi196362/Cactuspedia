import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualSidebarsComponent } from './dual-sidebars.component';

describe('DualSidebarsComponent', () => {
  let component: DualSidebarsComponent;
  let fixture: ComponentFixture<DualSidebarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DualSidebarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DualSidebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
