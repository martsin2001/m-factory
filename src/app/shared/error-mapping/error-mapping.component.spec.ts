import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMappingComponent } from './error-mapping.component';

describe('ErrorMappingComponent', () => {
  let component: ErrorMappingComponent;
  let fixture: ComponentFixture<ErrorMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
