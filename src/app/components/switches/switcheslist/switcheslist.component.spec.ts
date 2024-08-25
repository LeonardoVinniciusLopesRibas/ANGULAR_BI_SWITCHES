import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcheslistComponent } from './switcheslist.component';

describe('SwitcheslistComponent', () => {
  let component: SwitcheslistComponent;
  let fixture: ComponentFixture<SwitcheslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitcheslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwitcheslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
