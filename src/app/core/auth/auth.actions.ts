import { Action } from '@ngrx/store';
import { User } from './auth.interfaces';

export const LOAD_USER = 'LOAD_USER';
export const USER_SUCCESSFYLLY_LOADED = 'USER_SUCCESSFYLLY_LOADED';
export const USER_FAILED_LOADED = 'USER_FAILED_LOADED';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
  constructor(public payload: string) {}
}

export class SuccessfulLoadUser implements Action {
  readonly type = USER_SUCCESSFYLLY_LOADED;
  constructor(public payload: User) {}
}

export class FailedLoadUser implements Action {
  readonly type = USER_FAILED_LOADED;
}

export type UserActions = LoadUser | SuccessfulLoadUser | FailedLoadUser;
