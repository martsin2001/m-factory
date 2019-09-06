import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { ChatState, ChatReducer } from './chat/chat.reducer';
import { UserState, UserReducer } from './auth/auth.reducer';

export interface AppState {
  user: UserState;
  chats: ChatState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  user: UserReducer,
  chats: ChatReducer
};

export const GetAppState = createFeatureSelector<AppState>('app-state');
