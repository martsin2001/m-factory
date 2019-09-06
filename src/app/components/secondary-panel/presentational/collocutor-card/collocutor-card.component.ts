import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chat } from 'src/app/core/chat/chat.interfaces';
import { User } from 'src/app/core/auth/auth.interfaces';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-collocutor-card',
  templateUrl: './collocutor-card.component.html',
  styleUrls: ['./collocutor-card.component.scss']
})
export class CollocutorCardComponent implements OnInit, OnDestroy {
  @Input() set chat(chat: Chat) {
    if (chat.chatMembers.length === 2) {
      chat.chatMembers.forEach(member => {
        this.loadCollocutorsByKeys(member);
      });
    }
  }
  wasMouseOver: boolean;
  collocutorData: User;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  implementSoundEffect() {
    const soundEffect = new Audio('assets/sound-effects/over-card.mp3');
    soundEffect.onloadeddata = () => {
      soundEffect.play();
    };
  }

  loadCollocutorsByKeys(key: string) {
    this.authService
      .getUserByKey(key)
      .pipe(takeUntil(this.destroy$))
      .subscribe(chat => {
        this.collocutorData = chat;
      });
  }
}
