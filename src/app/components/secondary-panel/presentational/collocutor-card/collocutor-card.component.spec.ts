import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollocutorCardComponent } from './collocutor-card.component';

describe('CollocutorCardComponent', () => {
  let component: CollocutorCardComponent;
  let fixture: ComponentFixture<CollocutorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollocutorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollocutorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
