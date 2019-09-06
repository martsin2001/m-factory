import { createSelector } from '@ngrx/store';
import { GetAppState, AppState } from '../app.reducer';

export const getChats = createSelector(
  GetAppState,
  (state: AppState) => state.chats
);
