import { createSelector } from '@ngrx/store';
import { GetAppState, AppState } from '../app.reducer';

export const getUser = createSelector(
  GetAppState,
  (state: AppState) => state.user
);
