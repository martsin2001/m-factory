import { Chat } from './chat.interfaces';
import * as ChatActions from './chat.action';

const initialState: ChatState = {
  chats: [],
  loaded: false
};

export interface ChatState {
  chats: Chat[];
  loaded: boolean;
}

export function ChatReducer(
  state: ChatState = initialState,
  action: ChatActions.ChatActions
) {
  switch (action.type) {
    case ChatActions.LOAD_CHAT:
      return {
        ...state,
        loaded: false
      };
    case ChatActions.CHAT_SUCCESSFYLLY_LOADED:
      return {
        ...state,
        chats: [...state.chats, action.payload],
        loaded: true
      };
    case ChatActions.CHAT_FAILED_LOADED:
      return {
        ...state,
        chats: [],
        loaded: false
      };
    case ChatActions.CLEAR_UP:
      return {
        ...state,
        chats: [],
        loaded: false
      };
    default:
      return state;
  }
}
