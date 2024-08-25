import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchesgraficoComponent } from './switchesgrafico.component';

describe('SwitchesgraficoComponent', () => {
  let component: SwitchesgraficoComponent;
  let fixture: ComponentFixture<SwitchesgraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchesgraficoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitchesgraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
