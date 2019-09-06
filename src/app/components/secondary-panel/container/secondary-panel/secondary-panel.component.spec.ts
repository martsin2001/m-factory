import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryPanelComponent } from './secondary-panel.component';

describe('SecondaryPanelComponent', () => {
  let component: SecondaryPanelComponent;
  let fixture: ComponentFixture<SecondaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
