import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPlatformComponent } from './chat-platform.component';

describe('ChatPlatformComponent', () => {
  let component: ChatPlatformComponent;
  let fixture: ComponentFixture<ChatPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
