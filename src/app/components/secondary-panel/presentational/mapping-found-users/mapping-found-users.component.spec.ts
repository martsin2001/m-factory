import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingFoundUsersComponent } from './mapping-found-users.component';

describe('MappingFoundUsersComponent', () => {
  let component: MappingFoundUsersComponent;
  let fixture: ComponentFixture<MappingFoundUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingFoundUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingFoundUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
