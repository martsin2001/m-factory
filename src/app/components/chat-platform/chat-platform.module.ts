import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPlatformComponent } from './container/chat-platform/chat-platform.component';

@NgModule({
  declarations: [ChatPlatformComponent],
  imports: [CommonModule],
  exports: [ChatPlatformComponent]
})
export class ChatPlatformModule {}
