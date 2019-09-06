import { User } from '../auth/auth.interfaces';

export interface Chat {
  created: number;
  chatMembers: string[] | User[];
  messages: Message[];
  group: boolean;
}

export interface Message {
  author: string;
  message: string;
  date: Date;
}
