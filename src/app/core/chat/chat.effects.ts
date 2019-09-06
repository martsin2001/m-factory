import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  concatMap,
  mergeMap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';

import * as ChatAction from './chat.action';
import { Chat } from './chat.interfaces';

@Injectable()
export class ChatEffects {
  constructor(private actions$: Actions, private chatService: ChatService) {}

  @Effect()
  loadChat$ = this.actions$.pipe(
    ofType(ChatAction.LOAD_CHAT),
    mergeMap((action: ChatAction.LoadChat) => {
      return this.chatService.getChatByKey(action.payload).pipe(
        map(fireRes => {
          const chat = fireRes.payload.val() as Chat;
          return new ChatAction.SuccessfulLoadChat(chat);
        }),
        catchError(err => of(new ChatAction.FailedLoadChat()))
      );
    })
  );
}
