import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/core/chat/chat.service';
import { User } from 'src/app/core/auth/auth.interfaces';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/core/auth/auth.reducer';
import { LoadUser } from 'src/app/core/auth/auth.actions';
import { getUser } from 'src/app/core/auth/auth.selectors';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { LoadChat } from 'src/app/core/chat/chat.action';
import { ChatState } from 'src/app/core/chat/chat.reducer';
import { Chat } from 'src/app/core/chat/chat.interfaces';
import { getChats } from 'src/app/core/chat/chat.selectros';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-secondary-panel',
  templateUrl: './secondary-panel.component.html',
  styleUrls: ['./secondary-panel.component.scss']
})
export class SecondaryPanelComponent implements OnInit, OnDestroy {
  user: User;
  foundUsers: User[] = [];
  isSearchFocused: boolean;
  chats: Observable<Chat[]>;
  currentInputValue = null;
  isUserLoaded: Subject<boolean> = new Subject<boolean>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private chatService: ChatService,
    private authSerive: AuthService,
    private store: Store<UserState | ChatState>
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadCurrentUser();
    this.setCollocutorStatus();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  findUser({ value }) {
    this.currentInputValue = value;
    if (value) {
      this.chatService
        .findCollocutor(value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((users: User[]) => {
          this.foundUsers = users;
        });
    } else {
      this.foundUsers = [];
    }
  }

  loadChats() {
    console.log(this.user);
    if (this.user && this.user.chatIds) {
      this.user.chatIds.forEach((chatKey: string) => {
        this.store.dispatch(new LoadChat(chatKey));
      });
      this.chats = this.store.select(getChats).pipe(
        filter(chats => !!chats),
        map(({ chats }) => chats as Chat[]),
        takeUntil(this.destroy$)
      );
    }
  }

  loadUser() {
    this.isUserLoaded.next(false);
    this.store
      .select(getUser)
      .pipe(
        filter(user => !!user),
        takeUntil(this.isUserLoaded)
      )
      .subscribe(({ user }) => {
        if (user) {
          this.user = user;
          this.loadChats();
          this.isUserLoaded.next(true);
          this.isUserLoaded.complete();
        }
      });
  }

  setCollocutorStatus() {
    this.authSerive.checkCollocutorStatus();
  }

  loadCurrentUser() {
    this.store.dispatch(new LoadUser(localStorage.getItem('key')));
  }

  addNewChatKey(key: string) {
    if (this.user) {
      if (this.user.chatIds) {
        this.chatService.addNewChat([...this.user.chatIds, key]);
      } else {
        this.chatService.addNewChat([key]);
      }
    }
  }
}
