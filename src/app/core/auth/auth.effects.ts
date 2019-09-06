import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as UserAction from './auth.actions';
import { AuthService } from './auth.service';
import { User } from './auth.interfaces';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserAction.LOAD_USER),
    switchMap((action: UserAction.LoadUser) => {
      return this.authService.getUserByKey(action.payload).pipe(
        map((user: User) => {
          return new UserAction.SuccessfulLoadUser(user);
        }),
        catchError(err => of(new UserAction.FailedLoadUser()))
      );
    })
  );
}
