import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/chat/chat.service';
import { Chat } from 'src/app/core/chat/chat.interfaces';
import { Store } from '@ngrx/store';
import { ChatState } from 'src/app/core/chat/chat.reducer';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/auth/auth.interfaces';

@Component({
  selector: 'app-chat-platform',
  templateUrl: './chat-platform.component.html',
  styleUrls: ['./chat-platform.component.scss']
})
export class ChatPlatformComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private userService: AuthService,
    private store: Store<ChatState>
  ) {}

  ngOnInit() {}
}
