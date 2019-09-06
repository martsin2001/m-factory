import { Action } from '@ngrx/store';
import { Collocutor } from './collocutor.interfaces';

export const LOAD_COLLOCUTOR = 'LOAD_COLLOCUTOR';
export const COLLOCUTOR_SUCCESSFYLLY_LOADED = 'COLLOCUTOR_SUCCESSFYLLY_LOADED';
export const COLLOCUTOR_FAILED_LOADED = 'COLLOCUTOR_FAILED_LOADED';

export class LoadCollocutor implements Action {
  readonly type = LOAD_COLLOCUTOR;
  constructor(public payload: string) {}
}

export class SuccessfulLoadCollocutor implements Action {
  readonly type = COLLOCUTOR_SUCCESSFYLLY_LOADED;
  constructor(public payload: Collocutor) {}
}

export class FailedLoadCollocutor implements Action {
  readonly type = COLLOCUTOR_FAILED_LOADED;
}

export type CollocutorActions =
  | LoadCollocutor
  | SuccessfulLoadCollocutor
  | FailedLoadCollocutor;
