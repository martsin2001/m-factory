import { Action } from '@ngrx/store';
import { Chat } from './chat.interfaces';

export const LOAD_CHAT = 'LOAD_CHAT';
export const CHAT_SUCCESSFYLLY_LOADED = 'CHAT_SUCCESSFYLLY_LOADED';
export const CHAT_FAILED_LOADED = 'CHAT_FAILED_LOADED';
export const CLEAR_UP = 'CLEAR_UP';

export class LoadChat implements Action {
  readonly type = LOAD_CHAT;
  constructor(public payload: string) {}
}

export class SuccessfulLoadChat implements Action {
  readonly type = CHAT_SUCCESSFYLLY_LOADED;
  constructor(public payload: Chat) {}
}

export class FailedLoadChat implements Action {
  readonly type = CHAT_FAILED_LOADED;
}

export class ClearUp implements Action {
  readonly type = CLEAR_UP;
}

export type ChatActions =
  | LoadChat
  | SuccessfulLoadChat
  | FailedLoadChat
  | ClearUp;
