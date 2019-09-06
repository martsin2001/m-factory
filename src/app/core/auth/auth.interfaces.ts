import { Chat } from '../chat/chat.interfaces';

export interface User {
  name: string;
  email: string;
  status: boolean | Date;
  logo: string;
  chatIds: string[] | [];
}
