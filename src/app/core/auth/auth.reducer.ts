import { User } from './auth.interfaces';
import * as UserActions from './auth.actions';

const initialState: UserState = {
  user: null,
  loaded: false
};

export interface UserState {
  user: User;
  loaded: boolean;
}

export function UserReducer(
  state: UserState = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.LOAD_USER:
      return {
        ...state,
        loaded: false
      };
    case UserActions.USER_SUCCESSFYLLY_LOADED:
      return {
        ...state,
        user: action.payload,
        loaded: true
      };
    case UserActions.USER_FAILED_LOADED:
      return {
        ...state,
        user: null,
        loaded: false
      };
    default:
      return state;
  }
}
